package com.example.myapplication

import android.Manifest
import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Bundle
import android.webkit.GeolocationPermissions
import android.webkit.WebChromeClient
import android.webkit.WebView
import android.webkit.WebViewClient
import android.webkit.JavascriptInterface
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.example.myapplication.databinding.ActivityMainBinding
import android.content.res.Configuration
import android.util.Log
import android.webkit.WebSettings

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val LOCATION_PERMISSION_REQUEST_CODE = 100

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // View Binding 초기화
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // 위치 권한 확인 및 요청
        if (!checkLocationPermission()) {
            requestLocationPermission()
        }

        // WebView 설정
        setupWebView()

        applyDarkModeToWebView() // 초기 다크 모드 상태 적용
    }

    override fun onResume() {
        super.onResume()

        // 화면 복귀 시 다크 모드 상태 재적용
        applyDarkModeToWebView()
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val webView = binding.webView
        webView.webViewClient = object : WebViewClient() {
            @Deprecated("Deprecated in Java")
            override fun shouldOverrideUrlLoading(view: WebView, url: String): Boolean {
                view.loadUrl(url)
                return true
            }

            // 페이지 로딩이 완료되면 JavaScript를 실행하도록 설정
            override fun onPageFinished(view: WebView, url: String) {
                super.onPageFinished(view, url)
                // 페이지 로딩 완료 후 'openKakaoChatButton'에 클릭 이벤트 리스너 추가
                view.evaluateJavascript(
                    "document.getElementById('openKakaoChatButton').addEventListener('click', function() { Android.openKakaoOpenChat(); });",
                    null
                )
            }
        }




        webView.settings.apply {
            javaScriptEnabled = true // JavaScript 활성화
            setGeolocationEnabled(true) // Geolocation 활성화
            domStorageEnabled = true // DOM Storage 활성화
            allowContentAccess = true // Content Access 활성화
            allowFileAccess = true // File Access 활성화
            javaScriptCanOpenWindowsAutomatically = true // JavaScript에서 새 창 열기 허용
            mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW // HTTP/HTTPS 혼합 콘텐츠 허용

        }

        webView.clearCache(true) // 깃헙 변경사항 실시간 반영

        // JavaScript 인터페이스 추가
        webView.addJavascriptInterface(WebAppInterface(this), "Android")

        // 웹 페이지 로드
        webView.loadUrl("https://djaxoqja.github.io/my-app")


        // Geolocation 요청 처리
        webView.webChromeClient = object : WebChromeClient() {
            override fun onGeolocationPermissionsShowPrompt(
                origin: String,
                callback: GeolocationPermissions.Callback
            ) {
                callback.invoke(origin, true, false)
            }
        }
    }

    // 위치 권한 확인
    private fun checkLocationPermission(): Boolean {
        return ContextCompat.checkSelfPermission(
            this,
            Manifest.permission.ACCESS_FINE_LOCATION
        ) == PackageManager.PERMISSION_GRANTED
    }

    // 위치 권한 요청
    private fun requestLocationPermission() {
        ActivityCompat.requestPermissions(
            this,
            arrayOf(Manifest.permission.ACCESS_FINE_LOCATION),
            LOCATION_PERMISSION_REQUEST_CODE
        )
    }

    // 권한 요청 결과 처리
    override fun onRequestPermissionsResult(
        requestCode: Int,
        permissions: Array<out String>,
        grantResults: IntArray
    ) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
            if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                // 권한이 허용됨
            } else {
                // 권한이 거부됨
                // 사용자에게 권한 필요성을 알리는 UI 추가 가능
            }
        }
    }

    // 다크 모드 상태를 WebView에 적용하는 함수
    private fun applyDarkModeToWebView() {
        val isDarkMode = resources.configuration.uiMode and
                Configuration.UI_MODE_NIGHT_MASK == Configuration.UI_MODE_NIGHT_YES

        binding.webView.evaluateJavascript("toggleDarkMode($isDarkMode)", null)
    }


    class WebAppInterface(private val context: Context) {

        @JavascriptInterface
        fun openKakaoOpenChat() {
            Log.d("WebAppInterface", "openKakaoOpenChat 호출됨")  // 로그로 호출 여부 확인

            // 특정 오픈채팅방 URL
            val kakaoUri = Uri.parse("kakaoTalk://joinchat/{채팅방 고유 코드}")  // 고유 코드 입력
            val intent = Intent(Intent.ACTION_VIEW, kakaoUri)
            intent.setPackage("com.kakao.talk")

            if (intent.resolveActivity(context.packageManager) != null) {
                context.startActivity(intent)
            } else {
                val playStoreUri = Uri.parse("market://details?id=com.kakao.talk")
                val playStoreIntent = Intent(Intent.ACTION_VIEW, playStoreUri)
                context.startActivity(playStoreIntent)
            }
        }
    }
}