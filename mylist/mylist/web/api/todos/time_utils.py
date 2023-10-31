from datetime import datetime, timedelta


def is_today(time_value) -> bool:
    # 如果time_value已经是datetime对象，直接使用它
    if isinstance(time_value, datetime):
        given_time = time_value
    # 否则，尝试将其解析为datetime对象
    elif isinstance(time_value, str):
        try:
            given_time = datetime.strptime(time_value, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return False
    else:
        return False

    # 获取当前时间
    now = datetime.now()
    # 判断给定的时间是否与当前时间在同一天
    return given_time.date() == now.date()
