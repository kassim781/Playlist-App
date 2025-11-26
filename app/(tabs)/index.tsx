import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  ImageBackground,
  RefreshControl,
  PanResponder,
  Platform,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const { width, height } = Dimensions.get("window");

const SONGS = [
  {
    id: "1",
    title: "Perfect",
    artist: "Ed Sheeran",
    image: "https://i1.sndcdn.com/artworks-000223977248-5owk0a-t500x500.jpg",
    fav: true,
    recent: true,
  },
  {
    id: "2",
    title: "Blinding Lights",
    artist: "The Weeknd",
    image:
      "https://c.saavncdn.com/820/Blinding-Lights-English-2020-20200912094411-500x500.jpg",
    fav: false,
    recent: true,
  },
  {
    id: "3",
    title: "Levitating",
    artist: "Dua Lipa",
    image: "https://i.scdn.co/image/ab67616d0000b273ba578a036ceab4ffa77d1042",
    fav: true,
    recent: false,
  },
  {
    id: "4",
    title: "Shape of You",
    artist: "Ed Sheeran",
    image:
      "https://pagalworldi.com.co/wp-content/uploads/2025/08/Shape-Of-You-Mp3-SongPagalworldi.com_.co_.webp",
    fav: false,
    recent: true,
  },
  {
    id: "5",
    title: "See You Again",
    artist: "Wiz Khalifa ft. Charlie Puth",
    image:
      "https://pendujatt.com.se/uploads/album/furious-7-original-motion-picture-soundtrack-various-artists.webp",
    fav: true,
    recent: true,
  },
  {
    id: "6",
    title: "Star Boy",
    artist: "The Weeknd",
    image:
      "https://preview.redd.it/starboy-album-cover-colourised-v0-63bfaan13gd81.jpg?auto=webp&s=11a815f8c78324665fbbf15281e485b191dc3305",
    fav: true,
    recent: true,
  },
  {
    id: "7",
    title: "Peaches",
    artist: "Justin Bieber",
    image:
      "https://i1.sndcdn.com/artworks-boUvTeTEft8V0b2G-8spb0A-t500x500.jpg",
    fav: false,
    recent: false,
  },
  {
    id: "8",
    title: "Stay",
    artist: "The Kid LAROI, Justin Bieber",
    image: "https://f4.bcbits.com/img/a0725618779_16.jpg",
    fav: true,
    recent: true,
  },
  {
    id: "9",
    title: "Happier Than Ever",
    artist: "Billie Eilish",
    image:
      "https://images.genius.com/c27a75d4cd10d72ce1fa0cf703c20130.1000x1000x1.jpg",
    fav: false,
    recent: false,
  },
  {
    id: "10",
    title: "Watermelon Sugar",
    artist: "Harry Styles",
    image: "https://i.scdn.co/image/ab67616d0000b273b7de8cac280d5ad12da74180",
    fav: true,
    recent: true,
  },
  {
    id: "11",
    title: "Save Your Tears",
    artist: "The Weeknd",
    image:
      "https://i.pinimg.com/originals/25/34/e5/2534e5eb8bdd1b96bd5ec551fb14148f.jpg",
    fav: false,
    recent: true,
  },
  {
    id: "12",
    title: "Circles",
    artist: "Post Malone",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzE0epzxF8Zx6vMyd_tERy8nKLkFcN0dVvDVr09mq3YT8Jrl79_RmwLco041x3zxccT8g&usqp=CAU",
    fav: true,
    recent: false,
  },
  {
    id: "13",
    title: "Dance Monkey",
    artist: "Tones and I",
    image: "https://i.scdn.co/image/ab67616d0000b273c6f7af36ecdc3ed6e0a1f169",
    fav: false,
    recent: true,
  },
  {
    id: "14",
    title: "Bad Guy",
    artist: "Billie Eilish",
    image: "https://i.scdn.co/image/ab67616d0000b27350a3147b4edd7701a876c6ce",
    fav: true,
    recent: true,
  },
  {
    id: "15",
    title: "Señorita",
    artist: "Shawn Mendes & Camila Cabello",
    image:
      "https://i1.sndcdn.com/artworks-HAZ3Ru34GTQ3rAmd-LVwITA-t1080x1080.jpg",
    fav: false,
    recent: true,
  },
  {
    id: "16",
    title: "Faded",
    artist: "Alan Walker",
    image: "https://i1.sndcdn.com/artworks-000605451082-wlui39-t500x500.jpg",
    fav: true,
    recent: true,
  },
  {
    id: "17",
    title: "Counting Stars",
    artist: "OneRepublic",
    image: "https://i.scdn.co/image/ab67616d0000b2739e2f95ae77cf436017ada9cb",
    fav: false,
    recent: false,
  },
  {
    id: "18",
    title: "Uptown Funk",
    artist: "Mark Ronson ft. Bruno Mars",
    image: "https://i1.sndcdn.com/artworks-000500637585-bkne8w-t500x500.jpg",
    fav: true,
    recent: true,
  },
  {
    id: "19",
    title: "Heat Waves",
    artist: "Glass Animals",
    image: "https://i.scdn.co/image/ab67616d0000b2739e495fb707973f3390850eea",
    fav: false,
    recent: false,
  },
  {
    id: "20",
    title: "Industry Baby",
    artist: "Lil Nas X & Jack Harlow",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfk-93_9uPXaIeTUClHM97QE4ePhYaSg32Kw&s",
    fav: true,
    recent: true,
  },
];

const SEGMENTS = ["All Songs", "Favorites", "Recently Played"];

export default function SongsPlaylistApp() {
  const [search, setSearch] = useState("");
  const [songs, setSongs] = useState(SONGS);
  const [refreshing, setRefreshing] = useState(false);
  const [currentSong, setCurrentSong] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("All Songs");
  const [drawerVisible, setDrawerVisible] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileVisible, setProfileVisible] = useState(false); // profile modal

  // Animated values
  const slideAnim = useRef(new Animated.Value(height)).current; // full player translateY
  const drawerAnim = useRef(new Animated.Value(-width * 0.65)).current; // drawer translateX
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  // ensure slideAnim starts at bottom
  useEffect(() => {
    slideAnim.setValue(height);
  }, [slideAnim]);

  // push notification setup
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("musicChannel", {
        name: "Music Notifications",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Permission for notifications not granted!");
        return;
      }
    }}
     

  async function sendWelcomeNotification(username) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `🎵 Welcome ${username}!`,
        body: "Now enjoy your music 🎧",
      },
      trigger: { seconds: 3}, // 3 seconds after login
    });
  }

  // load username (auto-login)
  useEffect(() => {
    AsyncStorage.getItem("userName").then((name) => {
      if (name) {
        setUsername(name);
        setShowLogin(false);
      } else {
        setShowLogin(true);
      }
    });
  }, []);

  // --- Improved PanResponder for player drag (fixes slide up/down issues)
  // We'll track the last gesture dy and clamp correctly between 0..height.
  const panDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 8,
      onPanResponderGrant: () => {
        // stop any animations so drag is smooth
        slideAnim.stopAnimation();
        panDy.current = 0;
      },
      onPanResponderMove: (_, gestureState) => {
        // gestureState.dy is positive when dragging down
        const dy = gestureState.dy > 0 ? gestureState.dy : 0;
        // clamp to [0, height]
        const clamped = Math.min(Math.max(dy, 0), height);
        slideAnim.setValue(clamped);
        panDy.current = clamped;
      },
      onPanResponderRelease: (_, gestureState) => {
        const velocityY = gestureState.vy || 0;
        // If dragged more than 150 or fast downward swipe -> close
        if (panDy.current > 150 || velocityY > 0.8) {
          Animated.timing(slideAnim, {
            toValue: height,
            duration: 250,
            useNativeDriver: true,
          }).start(() => setExpanded(false));
        } else {
          // return to fully open
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
            friction: 8,
            tension: 60,
          }).start();
        }
        panDy.current = 0;
      },
    })
  ).current;

  // open drawer with proper overlay layering
  const openDrawer = () => {
    // if profile modal open, close it so drawer works cleanly
    if (profileVisible) setProfileVisible(false);
    drawerAnim.setValue(-width * 0.65);
    setDrawerVisible(true);
    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(drawerAnim, {
        toValue: -width * 0.65,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setDrawerVisible(false));
  };

  const filteredSongs = songs.filter((song) => {
    const matchSearch = song.title.toLowerCase().includes(search.toLowerCase());
    if (selectedSegment === "Favorites") return song.fav && matchSearch;
    if (selectedSegment === "Recently Played")
      return song.recent && matchSearch;
    return matchSearch;
  });

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
  };

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  const openPlayer = () => {
    // ensure drawer / profile closed
    if (drawerVisible) closeDrawer();
    if (profileVisible) setProfileVisible(false);
    slideAnim.setValue(height);
    setExpanded(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closePlayer = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 400,
      useNativeDriver: true,
    }).start(() => setExpanded(false));
  };

  const onRefresh = () => {
    setRefreshing(true);
    const shuffled = [...songs].sort(() => Math.random() - 0.5);
    setTimeout(() => {
      setSongs(shuffled);
      setRefreshing(false);
    }, 300);
  };

  const renderSong = ({ item }) => (
    <TouchableOpacity onPress={() => playSong(item)} activeOpacity={0.7}>
      <View
        style={[
          styles.songCard,
          currentSong?.id === item.id && { backgroundColor: "#2A2A2Aaa" },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.albumArt} />
        <View style={styles.songInfo}>
          <Text style={styles.songTitle}>{item.title}</Text>
          <Text style={styles.songArtist}>{item.artist}</Text>
        </View>
        <Ionicons
          name={
            currentSong?.id === item.id && isPlaying
              ? "pause-circle"
              : "play-circle"
          }
          size={32}
          color={currentSong?.id === item.id ? "#1DB954" : "#ccc"}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={{
        uri: "https://wallpapers.com/images/hd/white-and-green-spotify-xkmrog2ses4vykn9.jpg",
      }}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={openDrawer}>
            <Ionicons name="menu-outline" size={30} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>My Playlist</Text>

          {/* Avatar replaces login icon */}
          {username ? (
            <TouchableOpacity
              onPress={() => setProfileVisible(true)}
              style={{
                width: 35,
                height: 35,
                borderRadius: 20,
                backgroundColor: "#1DB954",
                alignItems: "center",
                justifyContent: "center",
                elevation: 4,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowLogin(true)}>
              <Ionicons name="person-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#ccc" />
          <TextInput
            placeholder="Search songs..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
          />
        </View>

        {/* Segments */}
        <View style={styles.segmentContainer}>
          {SEGMENTS.map((seg) => (
            <TouchableOpacity
              key={seg}
              style={[
                styles.segmentButton,
                selectedSegment === seg && styles.activeSegment,
              ]}
              onPress={() => setSelectedSegment(seg)}
            >
              <Text
                style={[
                  styles.segmentText,
                  selectedSegment === seg && styles.activeText,
                ]}
              >
                {seg}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Songs List */}
        <FlatList
          data={filteredSongs}
          renderItem={renderSong}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 140 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#1DB954"
            />
          }
        />

        {/* Mini Player (ensure above list for touches) */}
        {currentSong && !expanded && (
          <Pressable style={styles.miniPlayer} onPress={openPlayer}>
            <View style={styles.miniLeft}>
              <Image
                source={{ uri: currentSong.image }}
                style={styles.miniArt}
              />
              <View style={styles.miniTextContainer}>
                <Text style={styles.miniTitle}>{currentSong.title}</Text>
                <Text style={styles.miniArtist}>{currentSong.artist}</Text>
              </View>
            </View>

            <TouchableOpacity onPress={togglePlayPause}>
              <Ionicons
                name={isPlaying ? "pause-circle" : "play-circle"}
                size={36}
                color="#1DB954"
              />
            </TouchableOpacity>
          </Pressable>
        )}

        {/* Full Player (mounts only when expanded) */}
        {expanded && (
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.fullPlayer,
              {
                transform: [{ translateY: slideAnim }],
                zIndex: 999,
                elevation: 999,
              },
            ]}
          >
            <View style={styles.playerGrab} />

            <View style={styles.fullTop}>
              <TouchableOpacity onPress={closePlayer}>
                <Ionicons name="chevron-down" size={28} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.nowPlaying}>Now Playing</Text>
              <View style={{ width: 28 }} />
            </View>

            <Image
              source={{ uri: currentSong?.image }}
              style={styles.fullImage}
            />

            <View style={styles.fullSongInfo}>
              <Text style={styles.fullTitle}>{currentSong?.title}</Text>
              <Text style={styles.fullArtist}>{currentSong?.artist}</Text>
            </View>

            <View style={styles.playerControls}>
              <Ionicons name="play-skip-back" size={36} color="#fff" />
              <TouchableOpacity onPress={togglePlayPause}>
                <Ionicons
                  name={isPlaying ? "pause-circle" : "play-circle"}
                  size={70}
                  color="#1DB954"
                />
              </TouchableOpacity>
              <Ionicons name="play-skip-forward" size={36} color="#fff" />
            </View>
          </Animated.View>
        )}

        {/* Drawer (overlay + panel) */}
        {drawerVisible && (
          <>
            {/* overlay */}
            <Animated.View
              pointerEvents="auto"
              style={[
                {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 90,
                  elevation: 90,
                  justifyContent: "flex-start",
                },
                { opacity: overlayOpacity },
              ]}
            >
              {/* BlurView set to not capture touches so Pressable receives them */}
              <BlurView
                intensity={50}
                tint="dark"
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
              />
              <Pressable
                style={StyleSheet.absoluteFill}
                onPress={closeDrawer}
              />
            </Animated.View>

            {/* drawer panel */}
            <Animated.View
              style={[
                styles.drawer,
                {
                  transform: [{ translateX: drawerAnim }],
                  zIndex: 95,
                  elevation: 95,
                },
              ]}
            >
              {username ? (
                <Text
                  style={{ color: "#1DB954", fontSize: 16, marginBottom: 10 }}
                >
                  👋 Hello, {username}
                </Text>
              ) : null}
              <Text style={styles.drawerTitle}>Menu</Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedSegment("All Songs");
                  closeDrawer();
                }}
                style={styles.drawerItem}
              >
                <Ionicons name="musical-notes" size={22} color="#fff" />
                <Text style={styles.drawerText}>All Songs</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedSegment("Favorites");
                  closeDrawer();
                }}
                style={styles.drawerItem}
              >
                <Ionicons name="heart" size={22} color="#fff" />
                <Text style={styles.drawerText}>Favorites</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedSegment("Recently Played");
                  closeDrawer();
                }}
                style={styles.drawerItem}
              >
                <Ionicons name="time-outline" size={22} color="#fff" />
                <Text style={styles.drawerText}>Recently Played</Text>
              </TouchableOpacity>

              {/* Logout */}
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.removeItem("userName");
                  setUsername("");
                  setShowLogin(true);
                  closeDrawer();
                }}
                style={styles.drawerItem}
              ></TouchableOpacity>
            </Animated.View>
          </>
        )}

        {/* Profile Modal */}
        <Modal visible={profileVisible} transparent animationType="slide">
          <View style={styles.profileOverlay}>
            <BlurView
              intensity={70}
              tint="dark"
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            <View style={styles.profileModal}>
              <Text style={styles.profileTitle}>Your Profile</Text>
              <View style={styles.profileCircle}>
                <Text style={styles.profileLetter}>
                  {username.charAt(0).toUpperCase()}
                </Text>
              </View>
              <Text style={styles.profileName}>{username}</Text>

              <TouchableOpacity
                style={styles.logoutButton}
                onPress={async () => {
                  await AsyncStorage.removeItem("userName");
                  setUsername("");
                  setShowLogin(true);
                  setProfileVisible(false);
                }}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setProfileVisible(false)}>
                <Text style={{ color: "#ccc", marginTop: 10 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Login Form */}
        {showLogin && (
          <Animated.View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0,0,0,0.9)",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
              zIndex: 999,
            }}
          >
            <Text
              style={{
                color: "#1DB954",
                fontSize: 24,
                fontWeight: "bold",
                marginBottom: 25,
              }}
            >
              Login
            </Text>

            <TextInput
              placeholder="Username"
              placeholderTextColor="#888"
              value={username}
              onChangeText={setUsername}
              style={{
                width: "90%",
                backgroundColor: "rgba(255,247,247,0.8)",
                color: "#000",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 12,
                marginBottom: 15,
              }}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#888"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={{
                width: "90%",
                backgroundColor: "rgba(255,247,247,0.8)",
                color: "#000",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 12,
                marginBottom: 25,
              }}
            />

            <TouchableOpacity
              onPress={async () => {
                if (username && password) {
                  alert(`Welcome, ${username}!`);
                  await AsyncStorage.setItem("userName", username);
                  await sendWelcomeNotification(username);
                  setShowLogin(false);
                  setPassword("");
                } else {
                  alert("Please enter both fields");
                }
              }}
              style={{
                backgroundColor: "#1DB954",
                paddingVertical: 12,
                paddingHorizontal: 40,
                borderRadius: 25,
                marginBottom: 15,
              }}
            >
              <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowLogin(false)}>
              <Text style={{ color: "#aaa", fontSize: 15 }}>Cancel</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: { flex: 1 },
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "3%",
    marginBottom: 15,
  },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.8)",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 15,
  },
  searchInput: { color: "#fff", flex: 1, fontSize: 16, marginLeft: 8 },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(50,50,50,0.8)",
    borderRadius: 20,
    marginBottom: 15,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 20,
  },
  activeSegment: { backgroundColor: "#1DB954" },
  segmentText: { color: "#aaa", fontWeight: "600" },
  activeText: { color: "#fff" },
  songCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.8)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  albumArt: { width: 60, height: 60, borderRadius: 10 },
  songInfo: { flex: 1, marginLeft: 12 },
  songTitle: { color: "#fff", fontSize: 16, fontWeight: "600" },
  songArtist: { color: "#aaa", fontSize: 13, marginTop: 2 },

  miniPlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(30,30,30,0.95)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopWidth: 0.4,
    borderTopColor: "#333",
    zIndex: 50,
    elevation: 50,
  },
  miniLeft: { flexDirection: "row", alignItems: "center" },
  miniArt: { width: 50, height: 50, borderRadius: 8 },
  miniTextContainer: { marginLeft: 10 },
  miniTitle: { color: "#fff", fontSize: 15, fontWeight: "600" },
  miniArtist: { color: "#aaa", fontSize: 13 },

  fullPlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: "rgba(18,18,18,0.97)",
    justifyContent: "center",
    alignItems: "center",
  },
  playerGrab: {
    width: 60,
    height: 5,
    backgroundColor: "#666",
    borderRadius: 3,
    position: "absolute",
    top: 15,
  },
  fullTop: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nowPlaying: { color: "#fff", fontSize: 16, fontWeight: "600" },
  fullImage: { width: 280, height: 280, borderRadius: 15, marginBottom: 30 },
  fullSongInfo: { alignItems: "center", marginBottom: 25 },
  fullTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  fullArtist: { color: "#aaa", fontSize: 16, marginTop: 4 },
  playerControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
  },

  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 1 },

  drawer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.65,
    backgroundColor: "rgba(18,18,18,0.95)",
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 95,
    elevation: 95,
  },
  drawerTitle: {
    color: "#1DB954",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  drawerItem: { flexDirection: "row", alignItems: "center", marginBottom: 25 },
  drawerText: { color: "#fff", fontSize: 16, marginLeft: 12 },

  // profile modal
  profileOverlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  profileModal: {
    backgroundColor: "rgba(25,25,25,0.95)",
    borderRadius: 20,
    width: "80%",
    paddingVertical: 30,
    alignItems: "center",
  },
  profileTitle: {
    color: "#1DB954",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  profileCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1DB954",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  profileLetter: { color: "#fff", fontSize: 36, fontWeight: "bold" },
  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 25,
  },
  logoutButton: {
    backgroundColor: "#ff4d4d",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
