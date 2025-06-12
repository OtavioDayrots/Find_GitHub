// Importação de bibliotecas necessárias
import React, { useState, useEffect, useRef } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Pega as dimensões da tela (opcional, mas útil para responsividade)
const { width, height } = Dimensions.get('window');

// Componente principal do aplicativo
export default function App() {
  // Estado para a cor do ícone de coração
  const [heartColor, setHeartColor] = useState('gray');
  
  // Estado para a imagem do perfil
  const [urimage, setImage] = useState('https://github.com/mauriiicio.png');

  // Estado para o nome de usuário exibido
  const [nome, setNome] = useState('mauriiicio');

  // Estado para o conteúdo digitado no input
  const [inputValue, setInputValue] = useState('');

  // Animação de pulsação da imagem
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Animação de escala ao clicar no coração
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Efeito de animação ao montar o componente
  useEffect(() => {
    // Animação contínua de "pulsar"
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        })
      ])
    ).start();

    // Inicializa a escala do coração
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  // Alterna a cor do coração e aplica um "zoom" com animação
  const toggleHeartColor = () => {
    setHeartColor(heartColor === 'red' ? 'gray' : 'red');
    Animated.spring(scaleAnim, {
      toValue: 1.1,
      friction: 3,
      useNativeDriver: true,
    }).start(() => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    });
  };

  // Atualiza imagem e nome com base no input
  const updateImageFromInput = () => {
    if (inputValue.trim() !== '') {
      setImage(`https://github.com/${inputValue}.png`);
      setNome(inputValue);
    }
  };

  // Abre o perfil do GitHub no navegador
  const openGitHubProfile = () => {
    Linking.openURL(`https://github.com/${nome}`);
  };

  return (
    <View style={styles.container}>
      {/* Fundo com gradiente */}
      <LinearGradient
        colors={['#0D1117', '#161B22', '#238636']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Área principal do conteúdo com animação de escala */}
        <Animated.View style={[styles.content, { transform: [{ scale: scaleAnim }] }]}>
          
          {/* Imagem com efeito de pulsar */}
          <Animated.View style={[styles.imageContainer, { transform: [{ scale: pulseAnim }] }]}>
            <Image 
              source={{ uri: urimage }}
              style={styles.image}
            />
          </Animated.View>

          {/* Nome do usuário */}
          <Text style={styles.name}>@{nome}</Text>

          {/* Campo de input */}
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input}
              placeholder='Digite o usuário do GitHub...'
              value={inputValue}
              onChangeText={setInputValue}
              placeholderTextColor="#666"
            />
          </View>

          {/* Botões de coração e GitHub */}
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleHeartColor} style={styles.iconButton}>
              <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                <AntDesign name='heart' size={32} color={heartColor} />
              </Animated.View>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={openGitHubProfile} style={styles.iconButton}>
              <AntDesign name='github' size={32} color="black" />
            </TouchableOpacity>
          </View>

          {/* Botão para buscar o perfil */}
          <TouchableOpacity 
            style={styles.searchButton}
            onPress={updateImageFromInput}
          >
            <Text style={styles.searchButtonText}>Buscar Perfil</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
    position: 'relative',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  imageDecoration: {
    position: 'absolute',
    top: -10,
    left: -10,
    right: -10,
    bottom: -10,
    borderRadius: 110,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
    borderStyle: 'dashed',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    maxWidth: "300px",
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 10,
  },
  iconButton: {
    marginHorizontal: 15,
    padding: 10,
  },
  searchButton: {
    backgroundColor: '#000',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
