# Generated by Django 4.1.2 on 2022-10-19 16:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_compra_data_compra_compra_jogo_jogo_descricao_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='compra',
            name='desconto',
            field=models.CharField(default='', max_length=60),
        ),
        migrations.AddField(
            model_name='compra',
            name='preco_final',
            field=models.FloatField(default=0.0),
        ),
    ]
