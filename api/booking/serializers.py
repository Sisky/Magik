import rest_framework.serializers as rest_serializers

import booking.models as booking_models


class BookingSerializer(rest_serializers.HyperlinkedModelSerializer):
    class Meta:
        model = booking_models.Booking
        fields = ('url', 'date', 'level', 'room', 'am_dept', 'pm_dept', 'am_surg', 'pm_surg', 'valid', 'created', 'status', 'am_confirmed', 'pm_confirmed')
