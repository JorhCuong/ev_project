# TEMPLATE BACKEND DOCKERFILE
# Dùng làm mẫu cho các service Node.js backend mới
# Copy file này vào thư mục service khi cần khởi tạo microservice mới

FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
EXPOSE 5000 
CMD ["node", "index.js"]
