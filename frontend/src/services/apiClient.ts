// const API_URL = import.meta.env.VITE_BASE_URL;

const API_URL = "http://127.0.0.1:8000/api/v1/";

const getAccessToken = () => localStorage.getItem("access");
const getRefreshToken = () => localStorage.getItem("refresh");

const getDefaultHeaders = () => {
  const token = getAccessToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

const refreshToken = async () => {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token found");

  const res = await fetch(`${API_URL}auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    throw new Error("Unable to refresh token");
  }

  const data = await res.json();
  localStorage.setItem("access", data.access);
  return data.access;
};

// MAIN API
const fetchAPI = async (
  endpoint: string,
  method: string = "GET",
  body?: any,
  isFormData = false,
  retry: boolean = true,
): Promise<any> => {
  const headers = isFormData
    ? {
        ...(getAccessToken()
          ? { Authorization: `Bearer ${getAccessToken()}` }
          : {}),
      }
    : getDefaultHeaders();

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    credentials: "include",
    ...(body && (isFormData ? { body } : { body: JSON.stringify(body) })),
  });

  if (res.status === 401 && retry) {
    try {
      await refreshToken();
      return fetchAPI(endpoint, method, body, isFormData, false); // retry once
    } catch (refreshErr) {
      localStorage.removeItem("camphub_user_access");
      localStorage.removeItem("camphub_user_refresh");
      throw new Error("Session expired. Please log in again.");
    }
  }

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Error ${res.status}: ${error}`);
  }

  return res.status !== 204 ? await res.json() : null;
};

// LOGIN
export const login = async (data: { email: string; password: string }) => {
  const res = await fetchAPI("auth/login/", "POST", data);

  if (res.data.access && res.data.refresh) {
    localStorage.setItem("camphub_user_access", res.data.access);
    localStorage.setItem("camphub_user_refresh", res.data.refresh);
  } else {
    throw new Error("Login failed: invalid response");
  }

  return res;
};

// REGISTER
export const register = async ({
  username,
  email,
  password,
  major,
  student_id,
  graduation_year,
}: {
  username: string;
  email: string;
  password: string;
  role: string;
  major: string;
  student_id: string;
  graduation_year: string;
}) => {
  const res = await fetchAPI("auth/register/", "POST", {
    username,
    email,
    password,
    graduation_year,
    student_id,
    major,
  });

  if (!res.ok) {
    const errorData = await res.json();
    return errorData;
  }

  return res;
};

// User
export const getUserById = (userId: string) => fetchAPI(`users/${userId}/`);
export const changePassword = (data: any) =>
  fetchAPI("users/change-password/", "PUT", data);
export const patchPassword = (data: any) =>
  fetchAPI("users/change-password/", "PATCH", data);
export const getInstitutions = () => fetchAPI("users/institutions/");
export const getUserProfile = () => fetchAPI("users/profile/");
export const updateUserProfile = (data: any) =>
  fetchAPI("users/profile/", "PUT", data);

// export const logout = async () => {
//   try {
//     (fetchAPI("auth/logout/", "POST"),
//       // Remove token from localStorage
//       localStorage.removeItem("camphub_user_access"));
//     localStorage.removeItem("camphub_user_refresh");
//   } catch (error) {
//     console.error("Logout failed", error);
//   }
// };

export const refreshAuth = () => fetchAPI("auth/refresh/", "POST");
export const verifyEmail = (data: any) =>
  fetchAPI("auth/verify-email/", "POST", data);

// Courses
export const getCourses = () => fetchAPI("academic/courses/");
export const getCourseById = (id: string) =>
  fetchAPI(`academic/courses/${id}/`);
export const createCourse = (data: any) =>
  fetchAPI("academic/courses/create/", "POST", data);
export const enrollInCourse = (course_id: string) =>
  fetchAPI(`academic/courses/${course_id}/enroll/`, "POST");
export const unenrollFromCourse = (course_id: string) =>
  fetchAPI(`academic/courses/${course_id}/unenroll/`, "POST");
export const getEnrollments = (course_id: string) =>
  fetchAPI(`academic/courses/${course_id}/enrollments/`);
export const getCourseStudyGroups = (course_id: string) =>
  fetchAPI(`academic/courses/${course_id}/study-groups/`);
export const getAcademicDashboard = () => fetchAPI("academic/dashboard/");

// Study Groups
export const getAllStudyGroups = () => fetchAPI("academic/study-groups/");
export const createStudyGroup = (data: any) =>
  fetchAPI("academic/study-groups/create/", "POST", data);
export const getStudyGroupById = (id: string) =>
  fetchAPI(`academic/study-groups/${id}/`);
export const getStudyGroupMembers = (group_id: string) =>
  fetchAPI(`academic/study-groups/${group_id}/members/`);
export const joinStudyGroup = (group_id: string) =>
  fetchAPI(`academic/study-groups/${group_id}/join/`, "POST");
export const leaveStudyGroup = (group_id: string) =>
  fetchAPI(`academic/study-groups/${group_id}/leave/`, "POST");

// clubs
export const getClubs = () => fetchAPI("community/clubs/");
export const getClubById = (id: string) => fetchAPI(`community/clubs/${id}/`);
export const createClub = (data: any) =>
  fetchAPI("community/clubs/", "POST", data);
export const updateClub = (id: string, data: any) =>
  fetchAPI(`community/clubs/${id}/`, "PUT", data);
export const patchClub = (id: string, data: any) =>
  fetchAPI(`community/clubs/${id}/`, "PATCH", data);
export const deleteClub = (id: string) =>
  fetchAPI(`community/clubs/${id}/`, "DELETE");
export const joinClub = (id: string) =>
  fetchAPI(`community/clubs/${id}/join/`, "POST");
export const leaveClub = (id: string) =>
  fetchAPI(`community/clubs/${id}/leave/`, "DELETE");
export const getClubMembers = (id: string) =>
  fetchAPI(`community/clubs/${id}/members/`);
export const updateClubMember = (club_id: string, user_id: string, data: any) =>
  fetchAPI(`community/clubs/${club_id}/members/${user_id}/`, "PUT", data);
export const getManagingClubs = () => fetchAPI("community/clubs/managing/");
export const getMyClubs = () => fetchAPI("community/clubs/my_clubs/");

// events
export const getEvents = () => fetchAPI("community/events/");
export const getEventById = (id: string) => fetchAPI(`community/events/${id}/`);
export const createEvent = (data: any) =>
  fetchAPI("community/events/", "POST", data);
export const updateEvent = (id: string, data: any) =>
  fetchAPI(`community/events/${id}/`, "PUT", data);
export const patchEvent = (id: string, data: any) =>
  fetchAPI(`community/events/${id}/`, "PATCH", data);
export const deleteEvent = (id: string) =>
  fetchAPI(`community/events/${id}/`, "DELETE");
export const attendEvent = (id: string) =>
  fetchAPI(`community/events/${id}/attend/`, "PUT");
export const getEventAttendees = (id: string) =>
  fetchAPI(`community/events/${id}/attendees/`);
export const getAttendingEvents = () => fetchAPI("community/events/attending/");
export const getMyEvents = () => fetchAPI("community/events/my_events/");

// Conversations
export const getConversations = () => fetchAPI("messaging/conversations/");

// Group Chats
export const getGroupChats = () => fetchAPI("messaging/group-chats/");
export const createGroupChat = (data: any) =>
  fetchAPI("messaging/group-chats/", "POST", data);
export const joinGroupChat = (chatId: string) =>
  fetchAPI(`messaging/group-chats/${chatId}/join/`, "POST");
export const leaveGroupChat = (chatId: string) =>
  fetchAPI(`messaging/group-chats/${chatId}/leave/`, "POST");
export const addGroupMembers = (chatId: string, data: any) =>
  fetchAPI(`messaging/group-chats/${chatId}/members/`, "POST", data);
export const removeGroupMembers = (chatId: string, data: any) =>
  fetchAPI(`messaging/group-chats/${chatId}/members/`, "DELETE", data);
export const getGroupChat = (id: string) =>
  fetchAPI(`messaging/group-chats/${id}/`);
export const updateGroupChat = (id: string, data: any) =>
  fetchAPI(`messaging/group-chats/${id}/`, "PUT", data);
export const patchGroupChat = (id: string, data: any) =>
  fetchAPI(`messaging/group-chats/${id}/`, "PATCH", data);
export const deleteGroupChat = (id: string) =>
  fetchAPI(`messaging/group-chats/${id}/`, "DELETE");

// Group Messages
export const getGroupMessages = (chatId: string) =>
  fetchAPI(`messaging/group-chats/${chatId}/messages/`);
export const postGroupMessage = (chatId: string, data: any) =>
  fetchAPI(`messaging/group-chats/${chatId}/messages/`, "POST", data);
export const getGroupMessage = (id: string) =>
  fetchAPI(`messaging/group-messages/${id}/`);
export const updateGroupMessage = (id: string, data: any) =>
  fetchAPI(`messaging/group-messages/${id}/`, "PUT", data);
export const patchGroupMessage = (id: string, data: any) =>
  fetchAPI(`messaging/group-messages/${id}/`, "PATCH", data);
export const deleteGroupMessage = (id: string) =>
  fetchAPI(`messaging/group-messages/${id}/`, "DELETE");

// Messages
export const getMessages = () => fetchAPI("messaging/messages/");
export const postMessage = (data: any) =>
  fetchAPI("messaging/messages/", "POST", data);
export const getMessage = (id: string) => fetchAPI(`messaging/messages/${id}/`);
export const updateMessage = (id: string, data: any) =>
  fetchAPI(`messaging/messages/${id}/`, "PUT", data);
export const patchMessage = (id: string, data: any) =>
  fetchAPI(`messaging/messages/${id}/`, "PATCH", data);
export const deleteMessage = (id: string) =>
  fetchAPI(`messaging/messages/${id}/`, "DELETE");
export const markMessagesRead = (data: any) =>
  fetchAPI("messaging/messages/mark-read/", "POST", data);

// Notifications
export const getNotifications = () => fetchAPI("messaging/notifications/");
export const markNotificationRead = (notificationId: string) =>
  fetchAPI(`messaging/notifications/${notificationId}/mark-read/`, "POST");
export const getNotification = (id: string) =>
  fetchAPI(`messaging/notifications/${id}/`);
export const updateNotification = (id: string, data: any) =>
  fetchAPI(`messaging/notifications/${id}/`, "PUT", data);
export const patchNotification = (id: string, data: any) =>
  fetchAPI(`messaging/notifications/${id}/`, "PATCH", data);
export const markAllNotificationsRead = () =>
  fetchAPI("messaging/notifications/mark-all-read/", "POST");

// Search & Unread Count
export const searchUsers = () => fetchAPI("messaging/search/users/");
export const getUnreadCount = () => fetchAPI("messaging/unread-count/");

// Content
export const createContent = (data: any) =>
  fetchAPI("api/v1/content/", "POST", data);
export const getContent = (id: string) => fetchAPI(`api/v1/content/${id}/`);
export const updateContent = (id: string, data: any) =>
  fetchAPI(`api/v1/content/${id}/`, "PUT", data);
export const patchContent = (id: string, data: any) =>
  fetchAPI(`api/v1/content/${id}/`, "PATCH", data);
export const deleteContent = (id: string) =>
  fetchAPI(`api/v1/content/${id}/`, "DELETE");

export const getContentComments = (postId: string) =>
  fetchAPI(`api/v1/content/${postId}/comments/`);
export const shareContent = (postId: string, data: any) =>
  fetchAPI(`api/v1/content/${postId}/share/`, "POST", data);
export const getFeed = () => fetchAPI("api/v1/content/feed/");

// Content Comments
export const createComment = (data: any) =>
  fetchAPI("api/v1/content/comments/", "POST", data);
export const getComment = (id: string) =>
  fetchAPI(`api/v1/content/comments/${id}/`);
export const updateComment = (id: string, data: any) =>
  fetchAPI(`api/v1/content/comments/${id}/`, "PUT", data);
export const patchComment = (id: string, data: any) =>
  fetchAPI(`api/v1/content/comments/${id}/`, "PATCH", data);
export const deleteComment = (id: string) =>
  fetchAPI(`api/v1/content/comments/${id}/`, "DELETE");
