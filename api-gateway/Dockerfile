# Sử dụng Node.js nhẹ
FROM node:20-alpine

# Thiết lập thư mục làm việc
WORKDIR /app

# Copy package files
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà API Gateway chạy
EXPOSE 8080

# Lệnh khởi động service
CMD ["npm", "start"]
