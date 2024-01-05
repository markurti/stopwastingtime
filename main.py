# main.py
import webbrowser
import time


def open_link(url):
    webbrowser.open(url)


def is_valid_time():
    current_time = time.localtime()
    return 21 <= current_time.tm_hour < 23  # 9 PM to 11 PM


def open_links():
    youtube_link = "https://www.youtube.com/"
    twitch_link = "https://www.twitch.tv/"

    if is_valid_time():
        print("It's time to watch YouTube and Twitch!")
    else:
        print("Sorry, it's not the designated time to watch YouTube and Twitch.")


if __name__ == "__main__":
    open_links()
