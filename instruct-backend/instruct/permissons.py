from rest_framework import permissions

class IsAdminUserOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method != "GET":
            return request.user.is_active and request.user.is_superuser
        return True


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method != "GET":
            return request.user.is_active
        return True