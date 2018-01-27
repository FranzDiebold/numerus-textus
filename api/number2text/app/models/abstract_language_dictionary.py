from django.db import models


class AbstractLanguageDictionary(models.Model):
    word = models.CharField(max_length=64, primary_key=True, db_index=True)

    class Meta:
        abstract = True

    @classmethod
    def name(cls):
        raise NotImplementedError("Please implement this method.")
