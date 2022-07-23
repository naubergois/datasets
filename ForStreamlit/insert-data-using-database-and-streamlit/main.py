import streamlit as st 
from helperSqllte import *

text = st.text_input("enter your name")
text2 = st.text_input("enter you moblie number")

if st.button("summit"):
    insertSQL = f"""
    INSERT INTO contact (first_name,mobileno)
        VALUES ('{text}','{text2}');
    """
    crud(insertSQL,"/home/stark/Desktop/Dev/new video deleteit after the video/website.db")
