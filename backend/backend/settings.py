from pathlib import Path
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent


SECRET_KEY = "django-insecure-rp%n4cux&^wi7gz&vilfy7zi6k^=5h7ab)u548(7tb+dh4@dne"

DEBUG = True

ALLOWED_HOSTS = ["*"]



INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "django_filters",
    "drf_spectacular",  # Add this for Swagger documentation
    "corsheaders",  # Add CORS headers support
    "users",
    "academic",
    "community",
    "rest_framework_simplejwt.token_blacklist",
    'messaging',
    "content"
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",  # Add this for Swagger
}


SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=30),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "AUTH_HEADER_TYPES": ("Bearer",),
}
# Add Spectacular settings for Swagger documentation
SPECTACULAR_SETTINGS = {
    'TITLE': 'CampHub API',
    'DESCRIPTION': '''
    A comprehensive campus management system API that provides:
    - User authentication and profile management
    - Institutional email verification
    - Academic course and schedule management
    - Community features (posts, groups, events)
    - Real-time messaging and notifications system
    - Content feed with machine learning algorithms

    ## Authentication
    This API uses JWT (JSON Web Tokens) for authentication. Include the access token in the Authorization header:
    `Authorization: Bearer <your-access-token>`

    ## Real-time Features
    Messaging supports real-time updates through WebSocket connections for instant message delivery and presence status.

    ## Rate Limiting
    API endpoints are rate-limited to prevent abuse. Messaging endpoints have specific limits for message sending.

    ## File Uploads
    Image and file uploads are automatically optimized and validated for security and performance.
    ''',
    'VERSION': '1.0.0',
    'SERVE_INCLUDE_SCHEMA': False,
    'COMPONENT_SPLIT_REQUEST': True,
    'SCHEMA_PATH_PREFIX': '/api/v1/',
    'TAGS': [
        {'name': 'Authentication', 'description': 'User registration, login, email verification'},
        {'name': 'User Profile', 'description': 'Profile management and user information'},
        {'name': 'Institutions', 'description': 'Educational institutions and campuses'},
        {'name': 'Academic', 'description': 'Courses, schedules, and academic content'},
        {'name': 'Community', 'description': 'Posts, groups, events, and social features'},
        {'name': 'Content Feed', 'description': 'Personalized content feed with ML algorithms'},
        {'name': 'Content Interactions', 'description': 'User interactions and engagement tracking'},
        {'name': 'Posts', 'description': 'Create, read, update, and delete posts'},
        {'name': 'Comments', 'description': 'Comment system with nested replies'},
        {'name': 'Post Interactions', 'description': 'Likes, shares, and social interactions'},
        {'name': 'Direct Messages', 'description': 'One-on-one messaging between users'},
        {'name': 'Group Chats', 'description': 'Multi-user group messaging and management'},
        {'name': 'Group Messages', 'description': 'Messages within group chats'},
        {'name': 'Group Management', 'description': 'Join, leave, and manage group memberships'},
        {'name': 'Notifications', 'description': 'Push notifications and alerts'},
        {'name': 'Messaging Utilities', 'description': 'Search, unread counts, and messaging tools'},
    ],
    'SERVERS': [
        {'url': 'http://localhost:8000', 'description': 'Development server'},
        {'url': 'https://api.camphub.edu', 'description': 'Production server'},
    ],
    'SECURITY': [{'Bearer': []}],
    'CONTACT': {
        'name': 'CampHub API Support',
        'email': 'api-support@camphub.edu',
    },
    'LICENSE': {
        'name': 'MIT License',
    },
}


MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # Add CORS middleware
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


LANGUAGE_CODE = "en-us"

TIME_ZONE = "Africa/Nairobi"
USE_I18N = True
USE_TZ = True


STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"


DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# Custom User Model
AUTH_USER_MODEL = 'users.User'

# Email Configuration
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
DEFAULT_FROM_EMAIL = 'noreply@campusconnect.edu'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''

# Frontend URL for email verification links
FRONTEND_URL = 'http://localhost:3000'

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# Image optimization settings
MAX_UPLOAD_SIZE = 5 * 1024 * 1024  # 5MB
ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

# File upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 10 * 1024 * 1024  # 10MB

# CORS settings
CORS_ALLOWED_ORIGINS = ["https://camphub-demo.vercel.app", "https://camphub-demo.onrender.com", "http://localhost:8080"]
CORS_ALLOW_CREDENTIALS = True
CSRF_ALLOWED_ORIGIN = ["https://camphub-demo.vercel.app", "https://camphub-demo.onrender.com", "http://localhost:8080"]

# Messaging-specific settings
MESSAGE_RATE_LIMIT = 60  # messages per minute per user
GROUP_MESSAGE_RATE_LIMIT = 120  # group messages per minute per user
MAX_GROUP_MEMBERS = 500
MAX_MESSAGE_LENGTH = 5000
MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024  # 10MB

# WebSocket settings for real-time messaging
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },
    },
}

# Cache settings for online status
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
    }
}

# File storage for message attachments
DEFAULT_FILE_STORAGE = 'django.core.files.storage.FileSystemStorage'
ATTACHMENT_ROOT = MEDIA_ROOT / 'message_attachments'
