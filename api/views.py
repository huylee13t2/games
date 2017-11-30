from django.shortcuts import render
from django.db.models import Q
import json
from django.http import *
from django.views.decorators.csrf import csrf_exempt
import jwt
from django.contrib.auth.models import User, Group

from api.models import Profile, Question, Answer, Score


def main(request):
	return render(request, 'main.html', {})


@csrf_exempt
def profile_updated(request):
	token = request.POST.get('token')
	fullname = request.POST.get('fullname')
	gender = request.POST.get('gender')
	phone = request.POST.get('phone')
	city = request.POST.get('city')
	avatar = request.FILES.get('avatar')

	print('============')
	print(avatar)

	profile = Profile.objects.get(token=token)
	profile.fullname = fullname
	profile.gender = gender
	profile.phone = phone
	profile.city = city
	if avatar != None:
		profile.avatar = avatar

	profile.save()

	print('===> save')

	response = {
		'result' : profile.id,
	}

	return JsonResponse(response)


@csrf_exempt
def history(request):
	token = request.POST.get('token')

	profile = Profile.objects.get(token=token)

	list_score = Score.objects.filter(user=profile.user).order_by('-updated')[:10]
	history = []
	for obj in list_score:
		history.append({
			'score' : obj.score,
			'updated' : obj.updated
		})

	response = {
		'result' : 1,
		'data' : history
	}

	return JsonResponse(response)


def get_profile(request):
	print('====> get_profile')
	id_profile = request.GET.get('id')
	profile = Profile.objects.get(id = id_profile)

	response = {
		'result' : profile.id,
		'data' : {
			'id' : profile.user.id,
			'username' : profile.user.username,
			'email' : profile.user.email,
			'avatar' : profile.avatar.name,
			'fullname' : profile.fullname,
			'phone' : profile.phone,
			'city'  :profile.city,
			'gender'  :profile.gender
		}
	}

	return JsonResponse(response)


@csrf_exempt
def get_account(request):
	token = request.POST.get('token')

	profile = Profile.objects.get(token = token)

	response = {
		'result' : profile.id,
		'data' : {
			'id' : profile.user.id,
			'username' : profile.user.username,
			'email' : profile.user.email,
			'avatar' : profile.avatar.name,
			'fullname' : profile.fullname,
			'phone' : profile.phone,
			'city'  :profile.city,
			'gender'  :profile.gender
		}
	}

	return JsonResponse(response)


def top_score(request):

	scores = Score.objects.all().order_by('-score', '-updated')[:6]
	list_top = []
	for obj in scores:
		profile = Profile.objects.get(user=obj.user)
		list_top.append({
			'username' : obj.user.username,
			'id' : obj.user.id,
			'score' : obj.score,
			'avatar' : profile.avatar.name
		})

	response = {
		'result' : 1,
		'data' : list_top
	}

	return JsonResponse(response)


@csrf_exempt
def answer(request):
	token = request.POST.get('token')
	id_question = request.POST.get('id')
	answer_question = request.POST.get('answer_question')
	event_play = request.POST.get('event_play')

	profile = Profile.objects.get(token = token)
	print(profile)
	question = Question.objects.get(id =id_question)

	if event_play == 'new_play':
		check_answer = Answer.objects.filter(user=profile.user).order_by('-updated')[:1]
		if len(check_answer) == 0:
			play = 1
		else:
			play = check_answer[0].play + 1
		if answer_question == 'true':
			answer = Answer(user=profile.user, question=question, answer=True, play=play)
			score = Score(user=profile.user, score=10, play=play)
		else:
			answer = Answer(user=profile.user, question=question, answer=False, play=play)
			score = Score(user=profile.user, score=0, play=play)

		answer.save()
		score.save()

		response = {
			'result' : score.score,
			'data' : {
				'score' : score.score
			}
		}

	else:
		check_answer = Answer.objects.filter(user=profile.user).order_by('-updated')[:1]
		check_score = Score.objects.filter(Q(user=profile.user) & Q(play=check_answer[0].play))
		score = check_score[0].score
		if answer_question == 'true':
			answer = Answer(user=profile.user, question=question, answer=True, play=check_answer[0].play)
			answer.save()

			score = Score.objects.get(id=check_score[0].id)
			score.score = score.score + 10
			score.save()

			response = {
				'result' : score.id,
				'data' : {
					'score' : score.score
				}
			}

		else:
			answer = Answer(user=profile.user, question=question, answer=False, play=check_answer[0].play)
			check_score[0].score = check_score[0].score + 10
			answer.save()
			check_score[0].save()

			response = {
				'result' : 0,
				'data' : {
					'score' : check_score[0].score
				}
			}

	return JsonResponse(response)


def get_question(request):

	list_question = []
	questions = Question.objects.all()

	for obj in questions:
		list_question.append({
			'id' : obj.id,
			'title' : obj.title,
			'image' : obj.image.name,
			'image_url' : obj.image.url,
			'ket_qua' : obj.ket_qua	
		})

	response = {
		'result' : 1,
		'data' : list_question
	}

	return JsonResponse(response)


@csrf_exempt
def register(request):
	username = request.POST.get('username')
	password = request.POST.get('password')
	email = request.POST.get('email')
	full_name = request.POST.get('full_name')
	phone = request.POST.get('phone')
	gender = request.POST.get('gender')

	try:
		user = User(username = username, password=password, email=email)
		user.set_password(password)
		user.save()

		# create token
		token = jwt.encode({'some': username}, 'secret', algorithm='HS256')

		account = Profile(user=user, phone=phone, token=token, gender = gender, fullname=full_name)
		account.save()

		# timezone.now()

		response = {
			'result' : user.id
		}
	except:
		response = {
			'result' : -999
		}

	return JsonResponse(response)


@csrf_exempt
def login(request):
	username = request.POST.get('username')
	password = request.POST.get('password')

	try:
		account = Profile.objects.get(user__username = username)
		if account.user.check_password(password):
			response = {
				'result' : account.id,
				'data' : {
					'username' : account.user.username,
					'email' : account.user.email,
					'token' : account.token,
					'avatar' : account.avatar.name,
					'id' : account.user.id
				}
			}

		else:
			response = {
				'result' : 0,
			}
	except:
		response = {
			'result' : -999,
		}

	return JsonResponse(response)