var app = new Vue({
	el: '#app',

	data: {
		stageLevel: 1,
		turnCount: 1,
		watage: 0,
		strengthCount: 0,
		damageCuts: [1,1,1,1,1,1],
		damageUp: 1,
		isCenter: 1,
		cutOptions: [
          	{ value: "1.00", text: '0%' },
          	{ value: "0.90", text: '10%' },
          	{ value: "0.85", text: '15%' },
          	{ value: "0.80", text: '20%' },
          	{ value: "0.75", text: '25%' },
          	{ value: "0.70", text: '30%' },
          	{ value: "0.67", text: '33%' },
          	{ value: "0.60", text: '40%' },
          	{ value: "0.50", text: '50%' },
          	{ value: "0.30", text: '70%' },
          	{ value: "0.25", text: '75%' }
        ],
        upOptions: [
        	{ value: "1.00", text: '0%' },
        	{ value: "1.15", text: '15%' },
        	{ value: "1.20", text: '20%' },
        	{ value: "1.30", text: '30%' },
        	{ value: "1.40", text: '40%' },
        	{ value: "1.50", text: '50%' },
        	{ value: "1.60", text: '60%' },
        	{ value: "2.00", text: '100%' },
        ]
	},
	
	computed: {
		totalDamage : function (){
		
			var damage = 0;
			
			//基礎ダメージ
			let base = 400;
			for (var i = 1; i < this.stageLevel; i++) {
				base *= 1.1;
			}
			
			//貫通ダメージ
			damage += base * 0.1 * (this.turnCount - 1);
			
			//影響力ダウン出来るダメージ
			damage += base * (100 - this.watage) / 100;
			
			//4の倍数ターン判定
			if(this.turnCount % 4 == 0) damage *= 2;
		
			//Ceステージ判定
			damage *= this.isCenter;
		
			//ダメージCUT&UP
			let cuts = 1;
			for (let i=0; i<6; i++)
				cuts *= this.damageCuts[i];
			cuts *= this.damageUp;

			//打たれ強い
			cuts *= Math.pow(0.95, this.strengthCount);

			//小数点以下切り捨て
			damage = Math.floor(damage*cuts);
			
			return damage;
		}
	},
	
	methods:{
	
	}

})