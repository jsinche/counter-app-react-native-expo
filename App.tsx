import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useState } from "react";
import axiosInstance, { setBaseURL, setAuthToken } from "./axiosInstance";
import FAB from "./components/FAB";

export default function App() {
  const [count, setCount] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [response, setResponse] = useState<any>({});
  const [specimens, setSpecimens] = useState<any>([]);
  const handleLogin = async () => {
    try {
      setBaseURL("");
      const response = await axiosInstance.post("/get-domain-by-client-email", {
        email,
      });
      let subdomain = response.data.split(".")[0];
      console.log(subdomain);
      setBaseURL(subdomain);
      const { data } = await axiosInstance.post("/login", {
        email,
        password,
      });
      setResponse(data);
      console.log(data.data.token);
      setAuthToken(data.data.token);
      const response3 = await axiosInstance.get("/specimens/", {
        params: {
          order: "DESC",
          order_by: "plate",
          category_id: 1,
          search: "",
          page: 1,
          perpage: 50,
          origin: null,
          color: null,
          breeder_id: null,
          races: [],
          age_min: null,
          age_max: null,
          weight_min: null,
          weight_max: null,
          in_galpon: 1,
        },
      });
      setSpecimens(response3.data.data);
    } catch (error: any) {
      console.log(JSON.stringify(error));
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Text>{JSON.stringify(response)}</Text>
      <Text>{JSON.stringify(specimens)}</Text>

      {/* <Text style={styles.textHuge}>{count}</Text> */}
      {/* <FAB
        label="-1"
        onPress={() => setCount(count - 1)}
        onLongPress={() => setCount(0)}
        position="left"
      ></FAB>
      <FAB
        label="+1"
        onPress={() => setCount(count + 1)}
        onLongPress={() => setCount(0)}
      ></FAB> */}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  textHuge: {
    fontSize: 120,
    fontWeight: "100",
    textAlign: "center",
    margin: 10,
  },
});
