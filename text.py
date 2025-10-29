import tkinter as tk
import random
import threading
import time

def show_warm_tip():
    # 设置窗口标题和大小位置
    window_width = 300
    window_height = 90
    x = random.randint(0, 2260)
    y = random.randint(0, 1190)
    window = tk.Tk()
    window.title('温馨提示')
    window.geometry(f"{window_width}x{window_height}+{x}+{y}")

    # 提示文字列表（已添加新内容）
    tips = [
        '多喝水哦~', '保持微笑呀', '每天都要元气满满',
        '记得吃水果', '保持好心情', '好好爱自己', '我想你了',
        '梦想成真', '期待下一次见面', '金榜题名',
        '顺顺利利', '早点休息', '愿所有烦恼都消失',
        '别熬夜', '今天过得开心嘛', '天冷了，多穿衣服'
    ]
    tip = random.choice(tips)

    # 多样的背景颜色
    bg_colors = [
        'pink'
    ]
    bg = random.choice(bg_colors)

    # 创建标签并显示文字
    tk.Label(
        window,
        text=tip,
        bg=bg,
        font=('微软雅黑', 16),
        width=30,
        height=3
    ).pack()

    # 窗口置顶显示
    window.attributes('-topmost', True)
    window.mainloop()


# 创建线程列表
threads = []

# 窗口数量（根据屏幕大小可调整）
for i in range(300):
    t = threading.Thread(target=show_warm_tip)
    threads.append(t)
    time.sleep(0.005)  # 快速弹出窗口
    threads[i].start()