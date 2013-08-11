/**
 * @author zhixin wen <wenzhixin2010@gmail.com>
 */
	
(function() {
	
	var handlers = {
			'jd.com': jd,
			'amazon.cn': amazon,
			'dangdang.com': dangdang,
			'winxuan.com': winxuan,
			'beifabook.com': beifabook,
			'bookschina.com': bookschina,
			'china-pub.com': chinapub,
			'taoshu.com': taoshu
		},
		BOOK_URL = 'http://book.douban.com/isbn/';
	
	function main() {
		var href = location.href, 
			key;
		for (key in handlers) {
			if (href.indexOf(key) !== -1) {
				handlers[key]();
				break;
			}
		}
	}
	
	//京东商场
	function jd() {
		showInfo($.trim($('#summary-isbn .dd').text()));
	}
	
	//亚马逊中国
	function amazon() {
		showInfo($.trim($('b:contains("ISBN"):last').parent().text().split(':')[1]));
	}
	
	//当当
	function dangdang() {
		showInfo($.trim($('i:contains("I S B N"):last').parent().text().split('：')[1]));
	}
	
	//文轩网
	function winxuan() {
		showInfo($.trim($('td:contains("ISBN"):last').text().split(':')[1]));
	}
	
	//北发
	function beifabook() {
		showInfo($.trim($('td:contains("ISBN"):last').next().text()));
	}
	
	//中国图书网
	function bookschina() {
		$('td').each(function() {
			if ($(this).html().replace(/(&nbsp;)*/g, '').indexOf('ISBN') !== -1) {
				showInfo($.trim($(this).next().text()));
				return false;
			}
		});
	}
	
	//china-pub
	function chinapub() {
		showInfo($.trim($('li:contains("ISBN"):last').text().split('：')[1]));
	}
	
	//淘书网
	function taoshu() {
		showInfo($.trim($('span:contains("ISBN"):last').text().split('：')[1]));
	}
	
	function showInfo(isbn) {
		if (!isbn) return;
		$('body').append([
			'<ul class="douban-book-info">',
				'<li>',
					'<div>',
						'<a class="link" href="' + BOOK_URL + isbn + '" target="_blank">查看该图书在豆瓣上的相关信息</a>',
					'</div>',
				'</li>', 
			'</ul>'
		].join(''));
	}
	
	main();
})();
