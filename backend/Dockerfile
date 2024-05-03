FROM python:3.10.11-alpine

WORKDIR /code

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

RUN cd planner && python3 manage.py makemigrations && python3 manage.py migrate

EXPOSE 8000

CMD ["sh", "-c", "cd planner && python3 manage.py runserver 0.0.0.0:8000"]