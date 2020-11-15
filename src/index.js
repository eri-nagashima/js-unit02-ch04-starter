class Character {
  constructor(character) {
    this.name = character.name;
    this.hp = character.hp;
    this.mp = character.mp;
    // this.initialHP = character.initialHP;
    // this.initialMP = character.initialMP;
    this.offensePower = character.offensePower;
    this.defencePower = character.defencePower;
  }

  showStatus(character) {
    /* 
      キャラクターの名前、HP、MPを表示する。
    */
    const mainField = document.getElementById('main');
    let statusLog = document.createElement('div');
    statusLog.innerHTML = `Name: ${character.name},  HP: ${character.hp},  MP: ${character.mp}`;
    mainField.appendChild(statusLog);
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。
    */

    const mainField = document.getElementById('main');
    let attackLog = document.createElement('p');

    if (this.hp <= 0) {
      attackLog.innerHTML = `${this.name}は死んでいる！`;
      mainField.appendChild(attackLog);
    }

    if (defender.hp <= 0) {
      attackLog.innerHTML = `${defender.name}は死んでいる！`;
      mainField.appendChild(attackLog);
    }

    defender.hp = defender.hp - this.calcAttackDamage(defender);
    if (defender.hp <= 0) {
      attackLog.innerHTML = `${this.name}の攻撃！${defender.name}に${this.calcAttackDamage(defender)}のダメージ！${defender.name}を倒した！`;
    } else {
      attackLog.innerHTML = `${this.name}の攻撃！${defender.name}に${this.calcAttackDamage(defender)}のダメージ！`;
    }
    mainField.appendChild(attackLog);
  }

  calcAttackDamage(defender) {
    /*
      ダメージは単純に攻撃力から防御力を引いて計算する。
      ダメージが0未満の場合は、最低のダメージ1を与える。
    */

    let damage = this.offensePower - defender.defencePower;

    if (damage <= 0) {
      damage = 1;
    }
    return damage;
  }
}

class Sorcerer extends Character {
  constructor(character) {
    super(character);
  }

  healSpell(target) {
    /*
      回復魔法は3のMPを消費する。
      相手のHPを15回復する。
      魔法使いが死んでいる場合はその旨を表示する。
      相手が死んでいる場合は回復が出来ないためその旨を表示する。
      MPが足りない場合はその旨を表示する。
    */

    const mainField = document.getElementById('main');
    let healSpellLog = document.createElement('p');

    if (this.hp <= 0) {
      healSpellLog.innerHTML = `${this.name}は死んでいる！`;
      mainField.appendChild(healSpellLog);
    }

    if (target.hp <= 0) {
      healSpellLog.innerHTML = `${target.name}は死んでいる！`;
      mainField.appendChild(healSpellLog);
    }

    if (this.mp < 3) {
      healSpellLog.innerHTML = `${this.name}のMPが足りない！`;
    } else {
      healSpellLog.innerHTML = `${this.name}は回復魔法を唱えた！${target.name}のHPが15回復！`;
    }
    mainField.appendChild(healSpellLog);
    this.mp = this.mp - 3;
    target.hp = target.hp + 15;
  }

  fireSpell(target) {
    /*
        攻撃魔法は2のMPを消費する。
        相手に10のダメージを与える。
        魔法使いが死んでいる場合はその旨を表示する。
        相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
        MPが足りない場合はその旨を表示する。
      */

    const mainField = document.getElementById('main');
    let fireSpellLog = document.createElement('p');

    if (this.hp <= 0) {
      fireSpellLog.innerHTML = `${this.name}は死んでいる！`;
      mainField.appendChild(fireSpellLog);
    }

    if (target.hp <= 0) {
      fireSpellLog.innerHTML = `${target.name}は死んでいる！`;
      mainField.appendChild(fireSpellLog);
    }

    if (this.mp < 2) {
      fireSpellLog.innerHTML = `${this.name}のMPが足りない！`;
    } else {
      fireSpellLog.innerHTML = `${this.name}は炎の魔法を唱えた！${target.name}に10のダメージ！`;
    }
    mainField.appendChild(fireSpellLog);
    this.mp = this.mp - 2;
    target.hp = target.hp - 10;
  }
}

const fighter = new Character({
  name: '武道家',
  hp: 40,
  mp: 0,
  offensePower: 15,
  defencePower: 10,
});

const monster = new Character({
  name: 'モンスター',
  hp: 60,
  mp: 0,
  offensePower: 30,
  defencePower: 10,
});

const sorcerer = new Sorcerer({
  name: '魔法使い',
  hp: 25,
  mp: 10,
  offensePower: 8,
  defencePower: 10,
});

fighter.attack(monster);
sorcerer.attack(monster);
monster.attack(sorcerer);
fighter.attack(monster);
sorcerer.healSpell(sorcerer);
monster.attack(fighter);
fighter.attack(monster);
sorcerer.fireSpell(monster);
monster.attack(fighter);
fighter.showStatus(fighter);
sorcerer.showStatus(sorcerer);
monster.showStatus(monster);
