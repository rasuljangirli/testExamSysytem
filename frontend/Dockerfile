# 1. Build mərhələsi üçün Node.js image istifadə edirik
FROM node:18-alpine AS builder

# İş qovluğunu təyin edirik
WORKDIR /app

# package.json və package-lock.json fayllarını kopyalayırıq
COPY package*.json ./

# NPM paketlərini quraşdırırıq
RUN npm install

# Layihənin qalan hissəsini kopyalayırıq
COPY . .

# AŞAĞIDAKI SƏTRİ SİLİN:
# ARG VITE_APP_API_URL

# Vite tətbiqini build edirik. VITE_APP_API_URL dəyərini build zamanı ötürmürük.
# AŞAĞIDAKI SƏTRİ DƏYİŞDİRİN:
# RUN VITE_APP_API_URL=${VITE_APP_API_URL} npm run build
# YENİ SƏTRİ BU ŞƏKİLDƏ YAZIN:
RUN npm run build

# 2. Nginx ilə build olunmuş dist qovluğunu host etmək üçün Nginx image istifadə edirik
FROM nginx:stable-alpine

# Nginx-in default konfiqurasiyasını silirik
RUN rm /etc/nginx/conf.d/default.conf

# Xüsusi Nginx konfiqurasiya faylı əlavə edirik
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build mərhələsindən yaranan dist qovluğunu Nginx-in servis edəcəyi yerə kopyalayırıq
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx-in dinləyəcəyi portu açırıq
EXPOSE 80

# Nginx serverini başlatmaq üçün əmr
CMD ["nginx", "-g", "daemon off;"]
