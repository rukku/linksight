import os.path

from project_record_matching.api.models import Dataset
from rest_framework import serializers


class DatasetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dataset
        fields = '__all__'

    def create(self, validated_data):
        name = os.path.basename(validated_data['file'].name)
        return super().create(dict(name=name, **validated_data))
