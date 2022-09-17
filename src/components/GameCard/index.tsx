import { LinearGradient } from "expo-linear-gradient";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
  Text,
} from "react-native";
import { THEME } from "../../theme";

export interface GameCard {
  id: string;
  title: string;

  _count: { ads: number };
  bannerUrl: string;
}

interface GameCardComponentProps extends TouchableOpacityProps {
  data: GameCard;
}

import { styles } from "./styles";

export function GameCard({ data, ...rest }: GameCardComponentProps) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{ uri: data.bannerUrl }}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>
          <Text style={styles.ads}>{data._count.ads} anúncio(s)</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
