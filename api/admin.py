from django.contrib import admin
from api.models import Profile, Question, Score, Answer


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'fullname', 'gender',
                    'phone', 'city', 'avatar', 'updated']


class QuestionAdmin(admin.ModelAdmin):
    list_display = ['title', 'ket_qua', 'image', 'updated']


class AnswerAdmin(admin.ModelAdmin):
    list_display = ['user', 'question', 'answer', 'play', 'updated']


class ScoreAdmin(admin.ModelAdmin):
    list_display = ['user', 'score', 'play', 'updated']


admin.site.register(Profile, ProfileAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Score, ScoreAdmin)
admin.site.register(Answer, AnswerAdmin)
