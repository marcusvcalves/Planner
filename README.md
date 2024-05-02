# Planner

#### Projeto utilizando Django no back-end e React no front-end com JWT para autenticação

## Instalação:
1. Utilizando docker:
```
docker compose up --build
```
2. O frontend estará em http://localhost:3000/ e o backend em http://localhost:8000/

ou instalando as dependências necessárias, sendo necessário Python e Node instalados na máquina

**Atenção:** Os comandos a seguir devem ser executados na pasta principal do projeto e funcionam apenas para o Windows (Em Linux ou Mac a ativação do ambiente virtual é um pouco diferente)

1. Instalar as dependências do backend no ambiente virtual e acionar o servidor local
```
cd backend; python -m venv env; cd env/bin; ./activate; cd ../..; pip install -r requirements.txt; cd planner; python manage.py makemigrations; python manage.py migrate; python manage.py runserver;
```
2. Instalar as dependências do frontend e acionar o servidor local
```
cd frontend; npm i; npm start;
```
3. O frontend estará em http://localhost:3000/ e o backend em http://localhost:8000/

## Tecnologias Utilizadas:
- Django
- React
- JWT (Json Web Tokens)
- API Rest (Django Rest Framework)


## Imagem:
![Imagem Planner](https://github.com/marcusvcalves/Django_React_Planner/blob/main/app_img.png)

## Vídeo:

https://youtu.be/HMuM7OOmkDI
