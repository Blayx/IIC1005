#!/usr/bin/env python 2.7
# -*- coding: UTF-8 -*-
import pywapi, os, sys
import smtplib
from email.mime.text import MIMEText

#correo al que se desea que llegue el correo, nombre del usuario para personalizar y hora a la que se desea recibir el correo
nombre = "Pedro"
correo = "jamunoz14@uc.cl"
hora = 7

#usamos pywapi para obtener los datos de temperatura de weather.com
weather = pywapi.get_weather_from_weather_com("CIXX0020")
low = str(weather['forecasts'][0]['low'])
high = str(weather['forecasts'][0]['high'])
actual = str(weather['current_conditions']['temperature'])

#contenido del correo
texto = "Buenos dias, " + nombre + ".\n\nTe informamos que la temperatura máxima para hoy será de: " + high + "°C,\ny la mínima de: " + low + "°C.\nLa temperatura actúal es de: " + actual + "°C.\n\n Que tengas un buen día."

#paths de este archivo y python, para setear el crontab
file_path = os.path.realpath(__file__).rstrip('\n')
python_path = "/usr/bin/python"

#funcion para enviar correo, usando smptlib y email.mime
def enviar(de, para, mensaje, asunto, clave):
    msg = MIMEText(mensaje)
    
    msg['Subject'] = asunto
    
    msg['From'] = de
    msg['To'] = para
    
    mailServer = smtplib.SMTP('smtp.gmail.com', 587)
    mailServer.ehlo()
    mailServer.starttls()
    mailServer.ehlo()
    
    mailServer.login(de, clave)
    
    mailServer.sendmail(de, para, msg.as_string())
    
    mailServer.close()

#funcion que nos pregunta si deseamos setear el crontab en el sistema y lo hace
def set_crontab():
    global python_path, file_path
    response = raw_input("Deseas setear crontab para ejecutar este programa a diario? (s/N): ").lower()
    
    if (response == 's'):
        #setup crontab
        response2 = raw_input("Ingrese ubicacion de python 2. Para default solo presione enter (/usr/bin/python): ")
        if (response2 != ""):
            python_path = response2
        print "Ruta seleccionada: '" + python_path + "'"
        
        #seteamos el crontab
        crontab = crontab = 'crontab -l | (cat; echo "0 '+ str(hora) +' * * * ' + python_path + ' ' + file_path + ' -s";) | crontab -'
        os.system(crontab)

    elif (response == 'n'):
        print "OK, Gracias por usar."
    else:
        print "Lo sentimos, esa opcion es incorrecta."

#funcion main, revisa los argumentos con los que es llamado el script y lo ejecuta
def main():
    if (len(sys.argv) == 2):
        if sys.argv[1] == "-s":
            enviar("tareaiic1005@gmail.com", "jamunoz14@uc.cl", texto, "Información del clima", "iic1005tarea")
            print "enviado"
        else:
            print "El argumento entregado no es reconocido"
    elif (len(sys.argv) == 1):
        set_crontab()
    else:
        print "Argumentos entregados no son reconocidos"

if __name__ == '__main__':
    main()
