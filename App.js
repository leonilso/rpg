import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Importação dos Provedores de Contexto (A ordem importa!)
import { AuthProvider } from './src/contexts/AuthContext';
import { WorldProvider } from './src/contexts/WorldContext';
import { BattleProvider } from './src/contexts/BattleContext';

// Navegador Principal
import AppNavigator from './src/navigation/AppNavigator';

/**
 * O App.js envolve a aplicação em camadas:
 * 1. SafeArea: Garante que a UI não fique sob notches ou barras de sistema.
 * 2. Auth: Verifica quem está logado.
 * 3. World: Carrega os dados do mapa e NPCs do banco.
 * 4. Battle: Gerencia o estado de combate ativo.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthProvider>
          <WorldProvider>
            <BattleProvider>
              
              {/* Barra de status personalizada para o clima Dark Fantasy */}
              <StatusBar 
                barStyle="light-content" 
                backgroundColor="#1a1a1a" 
              />
              
              {/* O AppNavigator decide se mostra Login ou MainMenu */}
              <AppNavigator />

            </BattleProvider>
          </WorldProvider>
        </AuthProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}