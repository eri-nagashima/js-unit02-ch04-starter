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
    let statusField = document.createElement('div');
    statusField.innerHTML = `Name: ${character.name},  HP: ${character.hp},  MP: ${character.mp}`;
    mainField.appendChild(statusField);
  }

  attack(defender) {
    /*
      キャラクターが死んでいる場合は攻撃出来ないので、それを表示する。
      死んでいない場合は相手に与えたダメージを表示。
      相手が死んだ場合は相手に与えたダメージと死んだことを表示する。
    */

    const mainField = document.getElementById('main');

    let attackField = document.createElement('p');
    mainField.appendChild(attackField);

    let showDead = document.createElement('p');
    mainField.appendChild(showDead);

    defender.hp = defender.hp - this.calcAttackDamage(defender);

    if (this.hp <= 0) {
      //キャラクターが死んで攻撃できない場合
      showDead.innerHTML = `${this.name}は死んでいる！`;
    } else if (defender.hp <= 0) {
      //キャラクターの攻撃て相手を倒した&死んだ場合
      attackField.innerHTML = `${defender.name}を倒した！`;
      showDead.innerHTML = `${defender.name}は死んでいる！`;
    } else {
      //キャラクター&相手が生きている場合
      attackField.innerHTML = `${this.name}の攻撃！${defender.name}に${this.calcAttackDamage(defender)}のダメージ！`;
    }
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

    if (this.hp <= 0) {
      damage = 0;
    }

    return damage;
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

fighter.showStatus(fighter);
monster.showStatus(monster);

fighter.attack(monster);
monster.attack(fighter);

fighter.showStatus(fighter);
monster.showStatus(monster);

// class Sorcerer extends Character {
//   constructor() {}

//   healSpell(target) {
//     /*
//       回復魔法は3のMPを消費する。
//       相手のHPを15回復する。
//       魔法使いが死んでいる場合はその旨を表示する。
//       相手が死んでいる場合は回復が出来ないためその旨を表示する。
//       MPが足りない場合はその旨を表示する。
//     */
//   }

//   fireSpell(target) {
//     /*
//       攻撃魔法は2のMPを消費する。
//       相手に10のダメージを与える。
//       魔法使いが死んでいる場合はその旨を表示する。
//       相手が死んでいる場合は攻撃が出来ないためその旨を表示する。
//       MPが足りない場合はその旨を表示する。
//     */
//   }
// }

// {

//   const sorcerer = new Sorcerer({
//     name: '魔法使い',
//     hp: 25,
//     mp: 10,
//     offensePower: 8,
//     defencePower: 10,
//   });

//   fighter.attack(monster);
//   sorcerer.attack(monster);
//   monster.attack(sorcerer);
//   fighter.attack(monster);
//   sorcerer.healSpell(sorcerer);
//   monster.attack(fighter);
//   fighter.attack(monster);
//   sorcerer.fireSpell(monster);
//   monster.attack(fighter);
//   fighter.showStatus();
//   sorcerer.showStatus();
//   monster.showStatus();
// }
