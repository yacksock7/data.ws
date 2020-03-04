# ThunderStream RGate

Usage:
`docker run -d --name rgate.app
  -p 8000:8000
  -p 8080:8080
  -e TZ=Asia/Seoul
  -e DB_URL=jdbc:mariadb://localhost:3306/rgate
  -e DB_USERNAME=aetherit
  -e DB_PASSWORD=dnflRlfllogback-spring.xml
  aetherit/thunderstream.rgate:development`
  
DB Usage:
`docker run -d --name rgate.db
 -p 3306:3306
 -e TZ=Asia/Seoul
 -e MYSQL_ROOT_PASSWORD=dnflRlfl1535
 -e MYSQL_DATABASE=rgate
 -e MYSQL_USER=aetherit
 -e MYSQL_PASSWORD=dnflRlfl
 mariadb:10.4.12
 --character-set-server=utf8mb4
 --collation-server=utf8mb4_unicode_ci`
 