from django.db import models
import os
import random
from django.utils import timezone
from django.contrib.auth.models import User, Group


def content_file_name(instance, filename):
    now = timezone.now()
    x = str(now).replace("-", "").replace(" ", "").replace(":",
                                                           "").replace("+", "").replace(".", "")
    ext = filename.split('.')[-1]
    name = random.randint(100, 99999)
    filename = "%s%s.%s" % (x, name, ext)
    return os.path.join(filename)


class Profile(models.Model):
    list_choice_gender = (
        ("male", "Male"),
        ("female", "Female"),
    )

    user = models.ForeignKey(User, related_name="user_profile", null=True)
    fullname = models.CharField(max_length=255, blank=True, null=True)
    avatar = models.ImageField(
        upload_to=content_file_name, default='avt.jpg', blank=True, null=True)
    phone = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(
        max_length=9, choices=list_choice_gender, default="male")
    token = models.CharField(max_length=255, blank=True, null=True)
    created = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)
    updated = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)

    def __str__(self):
        return u'%s' % self.fullname


class Question(models.Model):
    title = models.CharField(max_length=255, blank=True, null=True)
    ket_qua = models.CharField(max_length=255, blank=True, null=True)
    image = models.ImageField(
        upload_to=content_file_name, blank=True, null=True)
    created = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)
    updated = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)

    def __str__(self):
        return u'%s' % self.title


class Answer(models.Model):
	user = models.ForeignKey(
        User, related_name='user_ans', blank=True, null=True)
	question = models.ForeignKey(
		Question, related_name='question_ans', blank=True, null=True)
	answer = models.BooleanField(default=False)
	play = models.IntegerField(default=0)
	created = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)
	updated = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)

	def __str__(self):
		return u'%s' % self.user


class Score(models.Model):
    user = models.ForeignKey(
        User, related_name='user_score', blank=True, null=True)
    score = models.IntegerField(default=0)
    play = models.IntegerField(default=0)
    created = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)
    updated = models.DateTimeField(
        auto_now_add=True, auto_now=False, null=True)

    def __str__(self):
        return u'%s' % self.user
