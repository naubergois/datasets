import streamlit as st
from PIL import Image, ImageDraw, ImageFont

im = None
st.title("MEMES MAKER")
txt = st.text_input("Enter Text")
img = st.file_uploader("upload image")

if img and txt:
    im = Image.open(img)
    st.write(im.size)
    st.image(im)

    st.markdown("<h3>Select Font..</h3>", unsafe_allow_html=True)
    opts = ['SF_Cartoonist_Hand_Bold.ttf','Bebas-Regular.ttf', 'Pacifico.ttf','freebooterscript.ttf','Sail-Regular.otf','Matchbook.otf']
    font_text = st.selectbox('FONT STYLE',opts)
    font_size = st.slider('FONT SIZE')
    font_color = st.color_picker('COLOR')

    btn = st.checkbox("Submit")
    if btn :
        
        draw = ImageDraw.Draw(im)
        font = ImageFont.truetype(font_text, font_size)
        draw.text((30,25), txt, font = font,fill = font_color)
        st.image(im)

        sv = st.checkbox('Save image')
        if sv:
            try:
                im.save('output.png',format='png')
                st.success('Saved Successfully')
            except Exception as e:
                print(e)
