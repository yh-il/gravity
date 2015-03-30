var gravity = {};

gravity.main = function(){

	/**
	 * gravity.main内で使用する変数・定数
	 */
	// var CHILD_LENGTH = Math.floor(Math.random() * 30) + 15; ★
	var CHILD_LENGTH = 10;
	var CONTAINER_WIDTH = 500;
	var CONTAINER_HEIGHT = 500;
	var childs = [];

	/**
	 * readyイベント
	 */
	$(function(){

		var parent = ParentFactory('#container');

		//DOMにボールを追加する
		for(var i = 0; i < CHILD_LENGTH; i++){
			childs[i] = ChildFactory(45);
			childs[i].appendTo(parent);
		}

		//一定間隔でフレームを進める
		setInterval(step, 30);

		//クリックでポジションをリセット
		$('#container').on('click', function(event) {
			reset();
		});

	});

	function reset(){
		var target;
		for(var i = 0; i < CHILD_LENGTH; i++){
			target = childs[i];
			target.reset();
		}
	}

	function step(){
		var target;
		for(var i = 0; i < CHILD_LENGTH; i++){
			target = childs[i];
			target.step();
		}
	}


	//▼ここからクラスっぽいやつ========================================================================= 

	/**
	 * 親作成クラス（ボールが入る箱部分）
	 * @param {[String]} _selector [対象のCSSセレクタ]
	 * @return {[function]} [このクラスの持つ関数（メソッド）]
	 */
	function ParentFactory(_selector){

		var JQ = $(_selector);
		
		JQ.css({
			width: CONTAINER_WIDTH + 'px',
			height: CONTAINER_HEIGHT + 'px',
			position: 'relative',
			backgroundColor: 'none',
			left: 0 + 'px',
			top: 0 + 'px'
		});

		function _append(_childJQ){
			JQ.append(_childJQ);
		}

		return{
			append: _append
		}

	}

	/**
	 * 子生成クラス（ボール部分）
	 * @param {[Integer]} _radius [ボールの角丸値]
	 */
	function ChildFactory(_radius){
		var JQ = $('<div>');
		var x = Math.random() * CONTAINER_WIDTH;
		var y = Math.random() * CONTAINER_HEIGHT / 2;
		var color = randomColor();

		JQ.css({
			width: (_radius * 2) + 'px',
			height: (_radius * 2) + 'px',
			position: 'absolute',
			left: x + 'px',
			top: y + 'px',
			backgroundColor: color,
			borderRadius: _radius + 'px',
			// boxShadow: (_radius/14)+"px "+(_radius/14)+"px "+(_radius/17)+"px "+(_radius/17)+"px #222"
		});

		function randomColor(){
			var color = Math.floor(Math.random() * 0xFFFFFF).toString(16);	//#RRGGBBを取得
			return '#' + color;
		}

		function _reset(){
			x = Math.random() * CONTAINER_WIDTH;
			y = Math.random() * CONTAINER_HEIGHT / 2;
		}

		function _step(){
			JQ.css({
				left: x + 'px',
				top: y + 'px'
			});
		}

		function _appendTo(_container){
			_container.append(JQ);
		}

		return{
			reset: _reset,
			step: _step,
			appendTo: _appendTo
		}
	}

};