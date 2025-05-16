// src/screens/ChatScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Button, Alert } from 'react-native';
import { processTaskFromText } from '../feautures/tasks/tasksService';
import { listTasksByUser } from '../services/taskService';
import { Task } from '../entities/Task';

const DEMO_USER_ID = 'demo-user';

export default function ChatScreen() {
  const [text, setText] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    const result = await listTasksByUser(DEMO_USER_ID);
    setTasks(result);
  };

  const handleAddTask = async () => {
    if (!text.trim()) return;

    try {
      setLoading(true);
      await processTaskFromText(text.trim(), DEMO_USER_ID);
      setText('');
      await fetchTasks();
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível processar a frase.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <View className="flex-1 p-4 bg-white">
      <Text className="text-xl font-bold mb-4">Tarefas com IA</Text>

      <TextInput
        className="border border-gray-300 rounded p-2 mb-4"
        placeholder="Ex: tenho reunião amanhã às 10h"
        value={text}
        onChangeText={setText}
      />

      <Button title="Criar tarefa com IA" onPress={handleAddTask} disabled={loading} />

      <FlatList
        className="mt-4"
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="border-b border-gray-200 py-2">
            <Text className="text-base font-medium">{item.title}</Text>
            {item.date && <Text className="text-sm text-gray-500">{item.date}</Text>}
          </View>
        )}
      />
    </View>
  );
}
