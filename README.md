# 📈 TW Project -  AGA (Actors Guild Awards Visualizer)

# 📚 Authors:

* 👨‍💻 Dragos Stoica (2A5)

* 👩‍💻 Daniela Petrea (2A5)

# ✨ UI/UX Design:

https://www.figma.com/file/RLWjXrEgDPMtq8J85jnWDe/Upsilon-UI%2FUX

# ⚙️ Backend Architecture:

https://www.figma.com/file/nqOvQVQX16kx7TIruoroNQ/Website-Architecture

# 🖥️ Video Presentation:

https://www.youtube.com/watch?v=ou2Hn-Cajt8&ab_channel=DragosStoica

# Instructions:

1. install 'node.js LTS' from https://nodejs.org/en/
2. npm install nodemon
3. npm install
4. install 'mongodb community 5.0.14' https://www.mongodb.com/try/download/community
5. install 'mongoDB command line database tools' version 100.6.1 from https://www.mongodb.com/try/download/database-tools
6. copy 'mongoimport.exe' from mongodb-database-tools-windows-x86 archive to MongoDB\Server\5.0\bin
7. get csv from https://www.kaggle.com/datasets/unanimad/screen-actors-guild-awards and move it to MongoDB\Server\5.0\bin
8. cmd, cd to MongoDB\Server\5.0\bin, run mongoimport -d sagdatabase -c awards --type csv --file screen_actor_guild_awards.csv --headerline
9. open project with 'npm run dev'


