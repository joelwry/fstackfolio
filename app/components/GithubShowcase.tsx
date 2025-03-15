"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { AnimatedGradient } from "./ui/animated-gradient"
import { useState, useEffect } from "react"
import { Github, ExternalLink } from "lucide-react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs"

interface Repository {
  name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
}

interface CodeSnippet {
  repo: string
  path: string
  code: string
  language: string
  url: string
}

const codeSnippets: CodeSnippet[] = [
  {
    repo: "PortfolioML",
    path: "portfolio_optimization.py",
    language: "python",
    url: "https://github.com/ArnavJ19/PortfolioML",
    code: `import numpy as np
import pandas as pd
from sklearn.cluster import AgglomerativeClustering
import matplotlib.pyplot as plt
import seaborn as sns

def optimize_portfolio(returns_data, n_clusters=5):
    """
    Optimize portfolio using hierarchical clustering
    
    Parameters:
    returns_data (pd.DataFrame): DataFrame of asset returns
    n_clusters (int): Number of clusters to form
    
    Returns:
    dict: Optimized portfolio weights
    """
    # Calculate covariance matrix
    cov_matrix = returns_data.cov()
    
    # Calculate correlation matrix for clustering
    corr_matrix = returns_data.corr()
    
    # Convert correlation to distance matrix
    distance_matrix = 1 - corr_matrix.abs()
    
    # Perform hierarchical clustering
    clustering = AgglomerativeClustering(
        n_clusters=n_clusters,
        affinity='precomputed',
        linkage='average'
    )
    
    clusters = clustering.fit_predict(distance_matrix)
    
    # Assign assets to clusters
    cluster_assets = {}
    for i, cluster in enumerate(clusters):
        if cluster not in cluster_assets:
            cluster_assets[cluster] = []
        cluster_assets[cluster].append(returns_data.columns[i])
    
    # Calculate weights (equal weight within clusters, then equal weight across clusters)
    weights = {}
    for cluster, assets in cluster_assets.items():
        cluster_weight = 1.0 / n_clusters
        asset_weight = cluster_weight / len(assets)
        for asset in assets:
            weights[asset] = asset_weight
    
    return weights`
  },
  {
    repo: "RL_Agent_Trading",
    path: "trading_agent.py",
    language: "python",
    url: "https://github.com/ArnavJ19/RL_Agent_Trading",
    code: `import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from tensorflow.keras.optimizers import Adam
import gymnasium as gym
from gymnasium import spaces

class TradingEnvironment(gym.Env):
    """Custom Trading Environment that follows gym interface"""
    
    def __init__(self, data, initial_balance=10000):
        super(TradingEnvironment, self).__init__()
        self.data = data
        self.initial_balance = initial_balance
        
        # Define action and observation space
        self.action_space = spaces.Discrete(3)  # Buy, Sell, Hold
        
        # Observation space: [price, balance, position]
        self.observation_space = spaces.Box(
            low=np.array([0, 0, 0]), 
            high=np.array([np.inf, np.inf, 1]),
            dtype=np.float32
        )
        
        self.reset()
    
    def reset(self):
        self.current_step = 0
        self.balance = self.initial_balance
        self.position = 0  # No position
        self.done = False
        return self._get_observation()
    
    def _get_observation(self):
        return np.array([
            self.data.iloc[self.current_step]['close'],
            self.balance,
            self.position
        ])
    
    def step(self, action):
        # Execute action
        current_price = self.data.iloc[self.current_step]['close']
        
        if action == 0:  # Buy
            if self.position == 0 and self.balance > current_price:
                self.position = 1
                self.balance -= current_price
        elif action == 1:  # Sell
            if self.position == 1:
                self.position = 0
                self.balance += current_price
        # action 2 is Hold
        
        # Move to next step
        self.current_step += 1
        
        # Calculate reward
        next_price = self.data.iloc[this.current_step]['close'] if this.current_step < len(self.data) else current_price
        reward = 0
        
        if self.position == 1:
            # Reward is the price change if holding a position
            reward = (next_price - current_price) / current_price
        
        # Check if done
        if self.current_step >= len(self.data) - 1:
            self.done = True
        
        return self._get_observation(), reward, self.done, {}`
  },
  {
    repo: "TwitterAutoBot",
    path: "auto_interact.py",
    language: "python",
    url: "https://github.com/ArnavJ19/TwitterAutoBot",
    code: `import tweepy

# Replace with your credentials
API_KEY = "your_api_key"
API_SECRET = "your_api_secret"
ACCESS_TOKEN = "your_access_token"
ACCESS_SECRET = "your_access_secret"

auth = tweepy.OAuthHandler(API_KEY, API_SECRET)
auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)
api = tweepy.API(auth)

def auto_interact(hashtag="#coding"):
    for tweet in tweepy.Cursor(api.search_tweets, q=hashtag, lang="en").items(20):
        try:
            api.create_favorite(tweet.id)
            api.retweet(tweet.id)
            print(f"Interacted with tweet from {tweet.user.screen_name}")
        except tweepy.TweepError as e:
            print("Error:", e.reason)

if __name__ == "__main__":
    auto_interact()`
  },
  {
    repo: "LunoTradingBot",
    path: "trading_bot.py",
    language: "python",
    url: "https://github.com/ArnavJ19/LunoTradingBot",
    code: `import requests
import time

API_KEY = "your_api_key"
API_SECRET = "your_api_secret"

def get_current_price(pair="BTCNGN"):
    url = f"https://api.luno.com/api/1/ticker?pair={pair}"
    response = requests.get(url)
    data = response.json()
    return float(data["last_trade"])

def execute_trade():
    buy_price = get_current_price()
    profit_target = buy_price * 1.03  # 3% profit margin
    print(f"Buying at: {buy_price}, target sell at: {profit_target}")
    
    # Simulate trade waiting
    while True:
        current_price = get_current_price()
        print(f"Current price: {current_price}")
        if current_price >= profit_target:
            print("Target reached! Selling now.")
            break
        time.sleep(10)

if __name__ == "__main__":
    execute_trade()`
  },
  {
    repo: "SMSSender",
    path: "sms_sender.py",
    language: "python",
    url: "https://github.com/ArnavJ19/SMSSender",
    code: `from twilio.rest import Client

# Twilio credentials
account_sid = 'your_account_sid'
auth_token = 'your_auth_token'
client = Client(account_sid, auth_token)

def send_sms(to, body):
    message = client.messages.create(
        body=body,
        from_='+1234567890',  # Your Twilio number
        to=to
    )
    print(f"Message sent: {message.sid}")

if __name__ == "__main__":
    send_sms("+19876543210", "Hello, this is a test message!")`
  },
  {
    repo: "NextJsBlogAPI",
    path: "pages/api/posts.ts",
    language: "typescript",
    url: "https://github.com/ArnavJ19/NextJsBlogAPI",
    code: `import type { NextApiRequest, NextApiResponse } from 'next'

const posts = [
  { id: 1, title: 'First Post', content: 'Hello world!' },
  { id: 2, title: 'Second Post', content: 'More content here.' }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(posts)
}`
  },
  {
    repo: "DjangoRestAPI",
    path: "api/views.py",
    language: "python",
    url: "https://github.com/ArnavJ19/DjangoRestAPI",
    code: `from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer`
  },
  {
    repo: "NodeExpressAPI",
    path: "server.js",
    language: "javascript",
    url: "https://github.com/ArnavJ19/NodeExpressAPI",
    code: `const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydb', { useNewUrlParser: true, useUnifiedTopology: true });

const Post = mongoose.model('Post', new mongoose.Schema({
  title: String,
  content: String
}));

app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.listen(3000, () => console.log('Server running on port 3000'));`
  },
  {
    repo: "ReactWeatherApp",
    path: "src/App.js",
    language: "javascript",
    url: "https://github.com/ArnavJ19/ReactWeatherApp",
    code: `import React, { useState, useEffect } from 'react';

function App() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch('https://api.weatherapi.com/v1/current.json?key=YOUR_KEY&q=London')
      .then(res => res.json())
      .then(data => setWeather(data));
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
      {weather ? (
        <div>
          <p>{weather.location.name}</p>
          <p>{weather.current.temp_c}°C</p>
          <img src={weather.current.condition.icon} alt="weather icon" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;`
  },
  {
    repo: "ReactNativeTodoApp",
    path: "App.js",
    language: "javascript",
    url: "https://github.com/ArnavJ19/ReactNativeTodoApp",
    code: `import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if(task) {
      setTasks([...tasks, { id: Date.now().toString(), title: task }]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.task}>{item.title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 50 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderColor: '#ccc', borderWidth: 1, padding: 10, marginBottom: 10 },
  task: { fontSize: 18, marginVertical: 5 }
});`
  },
  {
    repo: "BlockchainVotingApp",
    path: "contracts/Voting.sol",
    language: "solidity",
    url: "https://github.com/ArnavJ19/BlockchainVotingApp",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    mapping(string => uint) public votes;
    string[] public candidates;

    constructor(string[] memory candidateNames) {
        candidates = candidateNames;
    }

    function vote(string memory candidate) public {
        require(validCandidate(candidate), "Candidate does not exist");
        votes[candidate] += 1;
    }

    function validCandidate(string memory candidate) internal view returns (bool) {
        for (uint i = 0; i < candidates.length; i++) {
            if (keccak256(bytes(candidates[i])) == keccak256(bytes(candidate))) {
                return true;
            }
        }
        return false;
    }
}`
  },
  {
    repo: "SolidityToken",
    path: "contracts/MyToken.sol",
    language: "solidity",
    url: "https://github.com/ArnavJ19/SolidityToken",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}`
  },
  {
    repo: "VyperCrowdfunding",
    path: "crowdfunding.vy",
    language: "vyper",
    url: "https://github.com/ArnavJ19/VyperCrowdfunding",
    code: `# @version ^0.2.0

owner: public(address)
goal: public(uint256)
raised: public(uint256)
contributions: HashMap[address, uint256]

@external
def __init__(_goal: uint256):
    self.owner = msg.sender
    self.goal = _goal
    self.raised = 0

@payable
@external
def contribute():
    self.contributions[msg.sender] += msg.value
    self.raised += msg.value

@external
def withdraw():
    assert msg.sender == self.owner, "Not owner"
    assert self.raised >= self.goal, "Goal not reached"
    send(self.owner, self.balance)`
  },
  {
    repo: "JavaFXCalculator",
    path: "Calculator.java",
    language: "java",
    url: "https://github.com/ArnavJ19/JavaFXCalculator",
    code: `import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.TextField;
import javafx.scene.layout.GridPane;
import javafx.stage.Stage;

public class Calculator extends Application {
    private TextField display = new TextField();

    @Override
    public void start(Stage primaryStage) {
        GridPane pane = new GridPane();
        pane.setPadding(new Insets(10));
        pane.setHgap(5);
        pane.setVgap(5);
        display.setEditable(false);
        pane.add(display, 0, 0, 4, 1);

        String[] buttons = {
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", "C", "=", "+"
        };

        int row = 1, col = 0;
        for (String text : buttons) {
            Button button = new Button(text);
            button.setMinSize(40, 40);
            button.setOnAction(e -> process(text));
            pane.add(button, col, row);
            col++;
            if (col > 3) {
                col = 0;
                row++;
            }
        }

        Scene scene = new Scene(pane);
        primaryStage.setScene(scene);
        primaryStage.setTitle("Calculator");
        primaryStage.show();
    }

    private void process(String value) {
        if ("C".equals(value)) {
            display.clear();
        } else if ("=".equals(value)) {
            try {
                double result = eval(display.getText());
                display.setText(String.valueOf(result));
            } catch (Exception e) {
                display.setText("Error");
            }
        } else {
            display.appendText(value);
        }
    }

    private double eval(String expression) {
        // Note: Simple evaluator for demo purposes only
        return new Object() {
            int pos = -1, ch;
            void nextChar() { ch = (++pos < expression.length()) ? expression.charAt(pos) : -1; }
            boolean eat(int charToEat) {
                while (ch == ' ') nextChar();
                if (ch == charToEat) { nextChar(); return true; }
                return false;
            }
            double parse() {
                nextChar();
                double x = parseExpression();
                if (pos < expression.length()) throw new RuntimeException("Unexpected: " + (char)ch);
                return x;
            }
            double parseExpression() {
                double x = parseTerm();
                for (;;) {
                    if      (eat('+')) x += parseTerm();
                    else if (eat('-')) x -= parseTerm();
                    else return x;
                }
            }
            double parseTerm() {
                double x = parseFactor();
                for (;;) {
                    if      (eat('*')) x *= parseFactor();
                    else if (eat('/')) x /= parseFactor();
                    else return x;
                }
            }
            double parseFactor() {
                if (eat('+')) return parseFactor();
                if (eat('-')) return -parseFactor();
                int startPos = pos;
                if ((ch >= '0' && ch <= '9') || ch == '.') {
                    while ((ch >= '0' && ch <= '9') || ch == '.') nextChar();
                    return Double.parseDouble(expression.substring(startPos, pos));
                }
                throw new RuntimeException("Unexpected: " + (char)ch);
            }
        }.parse();
    }

    public static void main(String[] args) {
        launch(args);
    }
}`
  },
  {
    repo: "SceneBuilderInventory",
    path: "InventoryController.java",
    language: "java",
    url: "https://github.com/ArnavJ19/SceneBuilderInventory",
    code: `import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableView;
import javafx.scene.control.cell.PropertyValueFactory;

public class InventoryController {

    @FXML
    private TableView<Item> tableView;
    @FXML
    private TableColumn<Item, String> nameColumn;
    @FXML
    private TableColumn<Item, Integer> quantityColumn;

    private ObservableList<Item> itemList = FXCollections.observableArrayList();

    public void initialize() {
        nameColumn.setCellValueFactory(new PropertyValueFactory<>("name"));
        quantityColumn.setCellValueFactory(new PropertyValueFactory<>("quantity"));
        itemList.add(new Item("Widget", 10));
        itemList.add(new Item("Gadget", 15));
        tableView.setItems(itemList);
    }
}

class Item {
    private String name;
    private int quantity;
    public Item(String name, int quantity) {
        this.name = name;
        this.quantity = quantity;
    }
    public String getName() { return name; }
    public int getQuantity() { return quantity; }
}`
  },
  {
    repo: "FletChatApp",
    path: "chat_app.py",
    language: "python",
    url: "https://github.com/ArnavJ19/FletChatApp",
    code: `import flet as ft

def main(page: ft.Page):
    page.title = "Chat App"
    messages = ft.Column()
    user_input = ft.TextField(hint_text="Type a message", expand=True)

    def send_message(e):
        if user_input.value:
            messages.controls.append(ft.Text(user_input.value))
            user_input.value = ""
            page.update()

    send_button = ft.ElevatedButton("Send", on_click=send_message)
    page.add(messages, ft.Row([user_input, send_button]))

ft.app(target=main)`
  },
  {
    repo: "MongoDBDataVisualizer",
    path: "visualize.js",
    language: "javascript",
    url: "https://github.com/ArnavJ19/MongoDBDataVisualizer",
    code: `const { MongoClient } = require('mongodb');
const Chart = require('chart.js');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function visualizeData() {
    try {
        await client.connect();
        const database = client.db('mydb');
        const collection = database.collection('data');
        const data = await collection.find().toArray();
        const labels = data.map(item => item.label);
        const values = data.map(item => item.value);
        console.log('Data:', { labels, values });
        // Integrate with Chart.js in a web app to render charts.
    } finally {
        await client.close();
    }
}

visualizeData().catch(console.error);`
  },
  {
    repo: "MySQLBackupScript",
    path: "backup.js",
    language: "javascript",
    url: "https://github.com/ArnavJ19/MySQLBackupScript",
    code: `const { exec } = require('child_process');

const dbName = 'mydatabase';
const backupFile = 'backup.sql';

exec(\`mysqldump -u root -p \${dbName} > \${backupFile}\`, (error, stdout, stderr) => {
  if (error) {
    console.error(\`Backup error: \${error.message}\`);
    return;
  }
  if (stderr) {
    console.error(\`Backup stderr: \${stderr}\`);
    return;
  }
  console.log('Backup completed successfully.');
});`
  },
  {
    repo: "AIImageClassifier",
    path: "classifier.py",
    language: "python",
    url: "https://github.com/ArnavJ19/AIImageClassifier",
    code: `import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define a simple CNN model
model = tf.keras.models.Sequential([
    tf.keras.layers.Conv2D(32, (3,3), activation='relu', input_shape=(150, 150, 3)),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
    tf.keras.layers.MaxPooling2D(2,2),
    tf.keras.layers.Flatten(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(3, activation='softmax')
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Data generators
train_datagen = ImageDataGenerator(rescale=1./255)
train_generator = train_datagen.flow_from_directory(
    'data/train',
    target_size=(150, 150),
    batch_size=20,
    class_mode='categorical'
)

model.fit(train_generator, steps_per_epoch=100, epochs=10)
model.save('model.h5')`
  },
  {
    repo: "TypeScriptUtilityLibrary",
    path: "src/utils.ts",
    language: "typescript",
    url: "https://github.com/ArnavJ19/TypeScriptUtilityLibrary",
    code: `/**
 * A collection of utility functions for common operations.
 */

export function isEmpty(value: any): boolean {
    return value == null || (typeof value === 'object' && Object.keys(value).length === 0);
}

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    }) as T;
}

// Example usage:
if (require.main === module) {
    console.log(isEmpty({})); // true
    console.log(isEmpty({ key: 'value' })); // false
}`
  }
]

const descriptionMap: Record<string, string> = {
  "PortfolioML": "Portfolio optimization using machine learning techniques",
  "RL_Agent_Trading": "Reinforcement learning agent for algorithmic trading",
  "TwitterAutoBot": "Automate Twitter interactions using Tweepy",
  "LunoTradingBot": "Automated trading bot for cryptocurrency on Luno",
  "SMSSender": "Send SMS messages using Twilio",
  "NextJsBlogAPI": "Next.js API for serving blog posts",
  "DjangoRestAPI": "Django REST API for a simple blog",
  "NodeExpressAPI": "Express API with Node.js and MongoDB",
  "ReactWeatherApp": "A weather application built with React",
  "ReactNativeTodoApp": "A simple Todo app built with React Native",
  "BlockchainVotingApp": "Decentralized voting application using Solidity",
  "SolidityToken": "ERC20 token implementation using Solidity & OpenZeppelin",
  "VyperCrowdfunding": "Crowdfunding smart contract implemented in Vyper",
  "JavaFXCalculator": "A calculator application built with JavaFX",
  "SceneBuilderInventory": "Inventory management UI built using SceneBuilder",
  "FletChatApp": "A chat application built with Flet and Python",
  "MongoDBDataVisualizer": "Visualize MongoDB data using Chart.js",
  "MySQLBackupScript": "A Node.js script to backup a MySQL database",
  "AIImageClassifier": "An AI-powered image classifier using TensorFlow",
  "TypeScriptUtilityLibrary": "A collection of utility functions in TypeScript"
}

const GithubShowcase = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [repositories, setRepositories] = useState<Repository[]>([])
  const [selectedSnippet, setSelectedSnippet] = useState<CodeSnippet>(codeSnippets[0])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching repository data based on codeSnippets
    setTimeout(() => {
      setRepositories(
        codeSnippets.map((snippet) => ({
          name: snippet.repo,
          description: descriptionMap[snippet.repo] || `Code snippet for ${snippet.repo}`,
          html_url: snippet.url,
          language: snippet.language.charAt(0).toUpperCase() + snippet.language.slice(1),
          stargazers_count: Math.floor(Math.random() * 20) + 1, // random for demo
          forks_count: Math.floor(Math.random() * 10) + 1, // random for demo
        }))
      )
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <section id="github-showcase" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          ref={ref}
        >
          <AnimatedGradient className="inline-block">
            <h2 className="text-3xl md:text-4xl font-bold text-white px-4 py-2">GitHub Showcase</h2>
          </AnimatedGradient>
          <p className="text-gray-400">Explore some of my code directly from GitHub</p>
        </motion.div>

        <div>
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Featured Repositories</h3>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-[#1A1A1A] rounded-lg p-4 animate-pulse">
                    <div className="h-4 bg-[#252525] rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-[#252525] rounded w-full mb-2"></div>
                    <div className="h-3 bg-[#252525] rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4" style={{ display: 'flex',gap: '40px',alignItems: 'flex-start',overflowX: 'auto', padding:'20px 5px'}}>
                {repositories.map((repo) => (
                  <motion.div
                    key={repo.name}
                    className="bg-[#1A1A1A] rounded-lg p-4 hover:bg-[#252525] transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      const snippet = codeSnippets.find((s) => s.repo === repo.name)
                      if (snippet) setSelectedSnippet(snippet)
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{repo.name}</h4>
                      <a
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-400 hover:text-blue-400"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{repo.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="flex items-center">
                        <span
                          className={`w-2 h-2 rounded-full mr-1 ${repo.language.toLowerCase() === "python"
                              ? "bg-blue-500"
                              : repo.language.toLowerCase() === "r"
                                ? "bg-green-500"
                                : repo.language.toLowerCase() === "javascript"
                                  ? "bg-yellow-500"
                                  : repo.language.toLowerCase() === "typescript"
                                    ? "bg-purple-500"
                                    : repo.language.toLowerCase() === "solidity"
                                      ? "bg-gray-400"
                                      : repo.language.toLowerCase() === "vyper"
                                        ? "bg-gray-600"
                                        : repo.language.toLowerCase() === "java"
                                          ? "bg-red-500"
                                          : "bg-gray-500"
                            }`}
                        ></span>
                        {repo.language}
                      </span>
                      <div className="flex space-x-3">
                        <span className="flex items-center">
                          <span className="mr-1">★</span> {repo.stargazers_count}
                        </span>
                        <span className="flex items-center">
                          <span className="mr-1">🍴</span> {repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="pt-4">
              <a
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                <Github className="w-4 h-4 mr-2" />
                Repo
              </a>
            </div>
          </motion.div>
        </div>
        <div>
          <motion.div
            className="lg:col-span-2 bg-[#1A1A1A] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#252525] p-3 flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-white font-medium">{selectedSnippet.repo}</span>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-300">{selectedSnippet.path}</span>
              </div>
              <a
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400"
              >
                <ExternalLink size={16} />
              </a>
            </div>
            <div className="p-0 text-sm">
              <SyntaxHighlighter
                language={selectedSnippet.language}
                style={atomOneDark}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  borderRadius: 0,
                  maxHeight: "500px",
                  fontSize: "0.85rem",
                }}
              >
                {selectedSnippet.code}
              </SyntaxHighlighter>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default GithubShowcase
