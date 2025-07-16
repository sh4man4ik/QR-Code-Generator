function githubRepoLocation() {
	window.open('https://github.com/sh4man4ik/QR-Code-Generator');
}

//QR Code
let qrcode = document.getElementById('qrcode');
document.getElementById('settings-input-website').value = 'https://free-qrcode-generatorr.netlify.app';

function qrcodeGeneration(qrcodeWidth) {
	let qrcodeLink = document.getElementById('settings-input-website').value;
	qrcodeLink = qrcodeLink.trim();
	if (qrcodeLink == '') {
		qrcodeLink = 'https://free-qrcode-generatorr.netlify.app';
	}

	let qrcodeForegroundColor = document.getElementById('qrcode-foreground-color').value;
	let qrcodeBackgroundColor = document.getElementById('qrcode-background-color').value;

	qrcode = document.getElementById('qrcode');
	qrcode.innerHTML = '';

	new QRCode(qrcode, {
		text: qrcodeLink,
		width: qrcodeWidth == 0 ? qrcode.offsetWidth : 1000,
		height: qrcodeWidth == 0 ? qrcode.offsetWidth : 1000,
		colorDark: qrcodeForegroundColor,
		colorLight: qrcodeBackgroundColor,
		correctLevel: QRCode.CorrectLevel.H
	});
}
qrcodeGeneration(0);

addEventListener('resize', (event) => {
	qrcodeGeneration(0);
});

function downloadQRCode() {
	qrcode.style.display = 'none';
	qrcodeGeneration(1000);

	setTimeout(() => {
		let uri;

		if (isMobile()) {
			let canvas = document.querySelector('#qrcode canvas');
			uri = canvas.toDataURL('image/png');
		} else {
			uri = document.querySelector('#qrcode').querySelector('img').src;
		}

		let link = document.createElement('a');
		link.download = 'qrcode.png';
		link.href = uri;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		qrcode.style.display = 'block';
		qrcodeGeneration(0);
	}, 100);
}

function isMobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
