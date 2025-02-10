package com.mobileapp

import android.util.Log
import com.facebook.react.modules.network.OkHttpClientProvider
import okhttp3.OkHttpClient
import java.security.SecureRandom
import java.security.cert.X509Certificate
import javax.net.ssl.*

object NetworkingModule {

    fun enableSSLPinningBypass() {
        try {
            val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
                override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
                override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
                override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
            })

            val sslContext = SSLContext.getInstance("TLS")
            sslContext.init(null, trustAllCerts, SecureRandom())
            val sslSocketFactory = sslContext.socketFactory

            val client = OkHttpClient.Builder()
                .sslSocketFactory(sslSocketFactory, trustAllCerts[0] as X509TrustManager)
                .hostnameVerifier { _, _ -> true } // Bỏ qua kiểm tra hostname
                .build()

            OkHttpClientProvider.replaceOkHttpClient(client) // Thay OkHttp mặc định của React Native
            Log.d("NetworkingModule", "SSL Pinning Bypass Enabled")
        } catch (e: Exception) {
            Log.e("NetworkingModule", "Error enabling SSL Pinning Bypass", e)
        }
    }
}
