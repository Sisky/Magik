import rest_framework.viewsets as rest_viewsets
import rest_framework.permissions as rest_permissions

import booking.models as booking_models
import booking.permissions as booking_permissions
import booking.serializers as booking_serializers



class BookingView(rest_viewsets.ModelViewSet):
    queryset = booking_models.Booking.objects.all()
    serializer_class = booking_serializers.BookingSerializer

    permissions = [
        booking_permissions.CanBook,
        booking_permissions.Whatever,
    ]

    def get_queryset(self):
        queryset = self.filter_queryset_on_get(self.queryset, 'date')
        queryset = self.filter_queryset_on_get(queryset, 'level')
        queryset = self.filter_queryset_on_get(queryset, 'valid')
        queryset = self.filter_queryset_on_get(queryset, 'room')
        queryset = self.filter_queryset_on_get(queryset, 'status')

        return queryset.order_by('room','-created')

    def filter_queryset_on_get(self, queryset, key):
        value = self.request.query_params.get(key, None)
        if value:
            return queryset.filter(**{key: value})
        return queryset

