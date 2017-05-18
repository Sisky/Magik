import rest_framework.permissions as rest_permissions


class CanBook(rest_permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_anonymous and request.method in ['GET', 'POST']


class Whatever(rest_permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user.is_staff
