from django.conf.urls import url
from api import views

urlpatterns = [
    url(r'^$', views.main, name='main'),
    # url(r'^api/invite$', views.invite, name='invite'),
    # url(r'^api/get-user$', views.get_user, name='get_user'),
    # # user
    url(r'^api/register$', views.register, name='register'),
    url(r'^api/login$', views.login, name='login'),
    url(r'^api/get-question$', views.get_question, name='get_question'),
    url(r'^api/answer$', views.answer, name='answer'),
    url(r'^api/top-score$', views.top_score, name='top_score'),
    url(r'^api/get-account$', views.get_account, name='get_account'),
    url(r'^api/get-profile$', views.get_profile, name='get_profile'),
    url(r'^api/history$', views.history, name='history'),
    url(r'^api/update-profile$', views.profile_updated, name='profile_updated'),
]

