const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const playerWidth = 50;
const playerHeight = 80;
let playerX = 100;
let playerY = canvas.height - playerHeight - 10;
let enemyX = canvas.width - 150;
let enemyY = canvas.height - playerHeight - 10;
let playerHealth = 100;
let enemyHealth = 100;
let keys = {};

document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

function update() {
    // Mouvement du joueur
    if (keys['ArrowLeft'] && playerX > 0) {
        playerX -= 5;
    }
    if (keys['ArrowRight'] && playerX < canvas.width - playerWidth) {
        playerX += 5;
    }
    // Attaque
    if (keys['Space']) {
        if (playerX + playerWidth > enemyX && playerX < enemyX + playerWidth) {
            enemyHealth -= 1;
            if (enemyHealth <= 0) {
                alert('Vous avez gagné !');
                document.location.reload();
            }
        }
    }

    // IA de l'ennemi
    if (Math.random() < 0.02) {
        enemyX += (Math.random() < 0.5 ? -10 : 10);
        enemyX = Math.max(0, Math.min(canvas.width - playerWidth, enemyX));
    }
    // Collision avec le joueur
    if (enemyX + playerWidth > playerX && enemyX < playerX + playerWidth) {
        playerHealth -= 1;
        if (playerHealth <= 0) {
            alert('Vous avez perdu !');
            document.location.reload();
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le joueur
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, playerWidth, playerHeight);

    // Dessiner l'ennemi
    ctx.fillStyle = 'red';
    ctx.fillRect(enemyX, enemyY, playerWidth, playerHeight);

    // Afficher la santé
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Santé du joueur: ' + playerHealth, 10, 20);
    ctx.fillText('Santé de l\'ennemi: ' + enemyHealth, canvas.width - 200, 20);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
