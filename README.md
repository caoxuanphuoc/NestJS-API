How to run that into database
 Set up a new Prisma project
  npx prisma init
After create model in Prisma project
run command: npx prisma migrate dev
            -> chosse option
To see dashboad prisma
           => npx prisma studio
check with docker
docker exec -it dev-database bash
 psql -U postgres -W testDB