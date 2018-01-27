from django.contrib.admin import AdminSite, ModelAdmin
from django.contrib.auth.models import User

from app.models.test_language import TestLanguage
from app.models.german_language import GermanLanguage
from app.models.english_language import EnglishLanguage


class Number2TextAdminSite(AdminSite):
    site_header = 'Number2Text Admin'
    site_title = 'Number2Text Admin'


class LanguageAdmin(ModelAdmin):
    list_display = ('word', )
    readonly_fields = ('word', )
    search_fields = ('word', )
    ordering = ('word',)


class UserAdmin(ModelAdmin):
    list_display = ('username', 'first_name', 'last_name', 'date_joined', 'last_login', 'is_superuser')
    fields = ('username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff', 'date_joined', 'last_login')
    readonly_fields = ('date_joined', 'last_login')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('-last_login', )


admin_site = Number2TextAdminSite(name='number2text_admin')

admin_site.register(TestLanguage, LanguageAdmin)
admin_site.register(GermanLanguage, LanguageAdmin)
admin_site.register(EnglishLanguage, LanguageAdmin)
admin_site.register(User, UserAdmin)
