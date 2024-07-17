# Używamy obrazu Node.js 18.19 do budowy aplikacji
FROM node:18.19 as build

# Ustawiamy katalog roboczy w kontenerze
WORKDIR /app

# Kopiujemy pliki package.json i package-lock.json do kontenera
COPY package.json package-lock.json ./

# Instalujemy zależności
RUN npm install

# Kopiujemy pozostałe pliki aplikacji do kontenera
COPY . .

# Budujemy aplikację
RUN npm run build --prod

# Używamy Nginx do serwowania aplikacji
FROM nginx:alpine

# Kopiujemy zbudowane pliki z poprzedniego etapu do katalogu Nginx
COPY --from=build /app/dist/trace-key-stroke-app /usr/share/nginx/html

# Zamiana domyślnego pliku konfiguracyjnego Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Wystawiamy port 8080
EXPOSE 8080

# Startujemy Nginx
CMD ["nginx", "-g", "daemon off;"]
