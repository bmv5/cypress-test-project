FROM cypress/included:latest

# Встановлюємо Firefox та необхідні залежності
RUN apt-get update && \
    apt-get install -y firefox-esr && \
    rm -rf /var/lib/apt/lists/*

# Встановлюємо змінну оточення для використання Firefox
ENV BROWSER firefox

# Вказуємо робочу директорію
WORKDIR /app

# Копіюємо всі файли з локальної машини в контейнер
COPY . .

# Запускаємо тести
CMD ["cypress", "run", "--browser", "firefox"]