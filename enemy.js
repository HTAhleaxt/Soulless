class Enemy {
    constructor(name, health, attack, defense, specialAbilities) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.defense = defense;
        this.specialAbilities = specialAbilities; // This could be an array or object
    }

    takeDamage(damage) {
        this.health -= damage;
    }

    isDead() {
        return this.health <= 0;
    }

    performAttack() {
        // To be added
    }
}