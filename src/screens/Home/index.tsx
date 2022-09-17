import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Image, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GameParams } from "../../@types/navigation";
import api from "../../api";
import logoImg from "../../assets/logo-nlw-esports.png";
import { Background } from "../../components/Background";
import { GameCard } from "../../components/GameCard";
import { Heading } from "../../components/Heading";

import { styles } from "./styles";

type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  };
};

export function Home() {
  const [games, setGames] = useState<Game[]>([]);

  const navigation = useNavigation();

  const handleOpenGame = ({ id, title, bannerUrl }: GameParams) => {
    navigation.navigate("game", { id, title, bannerUrl });
  };

  useEffect(() => {
    api
      .get<Game[]>("/games")
      .then((response) => {
        setGames(response.data);
      })
      .catch((err) => alert(JSON.stringify(err, null, 2)));
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo} />

        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar"
        />

        <FlatList
          data={games}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <GameCard data={item} onPress={() => handleOpenGame(item)} />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.contentList}
        />
      </SafeAreaView>
    </Background>
  );
}
