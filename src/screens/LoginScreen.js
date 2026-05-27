import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  ImageBackground, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { COLORS, APP_CONFIG } from '../utils/constants';
import MenuButton from '../components/MenuButton';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signIn } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos para entrar no reino.");
      return;
    }

    setLoading(true);
    try {
      // O método signIn está definido no seu AuthContext
      await signIn(email, password);
      // O redirecionamento acontece automaticamente pelo AppNavigator 
      // ao detectar que o estado 'user' não é mais null.
    } catch (error) {
      Alert.alert(
        "Falha na Autenticação", 
        "As runas de acesso estão incorretas. Verifique seu e-mail e senha."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
  try {
    const novoHeroi = {
      nome: nome, // estados que você captura nos inputs
      senha: senha,
      vidaMaxima: 100,
      nivel: 1,
      isNpc: false
    };

    const resultado = await registerHero(novoHeroi);
    Alert.alert("Sucesso!", `Herói ${resultado.nome} criado! Agora faça login.`);
  } catch (error) {
    Alert.alert("Erro no Registro", "Não foi possível criar seu herói.");
  }
};

  return (
    <ImageBackground 
      source={require('../../assets/images/login-bg.jpg')} 
      style={styles.background}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.container}>
          {/* Título e Logo */}
          <View style={styles.header}>
            <Text style={styles.gameTitle}>{APP_CONFIG.NAME}</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>Acesse seu destino</Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <Text style={styles.label}>E-MAIL</Text>
            <TextInput 
              style={styles.input}
              placeholder="seu@email.com"
              placeholderTextColor="#666"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <Text style={styles.label}>SENHA</Text>
            <TextInput 
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#666"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <MenuButton 
              title={loading ? "INVOCANDO..." : "ENTRAR NO REINO"} 
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginBtn}
            />

            {loading && <ActivityIndicator color={COLORS.PRIMARY} style={{ marginTop: 20 }} />}
          </View>

          {/* Footer */}
            <TouchableOpacity onPress={() => navigation.navigate('Register')}> 
                <Text style={styles.registerText}>
                    Ainda não tem uma conta? <Text style={styles.highlight}>Registre-se</Text>
                </Text>
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1, resizeMode: 'cover' },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center' },
  container: { padding: 30 },
  header: { alignItems: 'center', marginBottom: 50 },
  gameTitle: { 
    color: COLORS.PRIMARY, 
    fontSize: 36, 
    fontWeight: 'bold', 
    letterSpacing: 3,
    textAlign: 'center'
  },
  divider: { 
    width: 100, 
    height: 2, 
    backgroundColor: COLORS.PRIMARY, 
    marginVertical: 15 
  },
  subtitle: { color: '#FFF', fontSize: 16, letterSpacing: 2, opacity: 0.8 },
  form: { width: '100%' },
  label: { color: COLORS.PRIMARY, fontSize: 12, fontWeight: 'bold', marginBottom: 8 },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    color: '#FFF',
    padding: 15,
    marginBottom: 20,
    fontSize: 16
  },
  loginBtn: { marginTop: 10 },
  registerText: { 
    color: '#AAA', 
    textAlign: 'center', 
    marginTop: 30, 
    fontSize: 14 
  },
  highlight: { color: COLORS.PRIMARY, fontWeight: 'bold' }
});

export default LoginScreen;