FROM python:3.10.11-alpine

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

RUN cd planner && python3 manage.py makemigrations

COPY . .

EXPOSE 8000

CMD ["sh", "-c", "cd planner && python3 manage.py runserver 0.0.0.0:8000"]