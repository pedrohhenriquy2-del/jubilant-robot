# Vídeo do anúncio Mix-01

Arquivos usados para gerar o vídeo `public/products/mix-01-black-friday.mp4`.

- `render.py`: desenha as 5 cenas (1080x1920, 30 fps) com a foto do produto e as cores da Selune.
- `music.py`: cria a trilha original (`trilha.wav`), sem direitos de terceiros.
- `trilha.wav`: a trilha pronta.

Para gerar de novo (precisa de Python com Pillow e numpy, ffmpeg e a fonte Poppins):

    python3 render.py
    ffmpeg -i out/mix-01-black-friday.mp4 -i trilha.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest mix-01-black-friday-musica.mp4
