import config from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

////////////////////////////////// API

export async function getLatestWorkouts(page: any) {
  try {
    const url = `${config.URL}json/data_workouts.php?page=${page}&limit=8`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getPremiumWorkouts(page: any) {
  try {
    const url = `${config.URL}json/data_workouts.php?page=${page}&limit=8&price=premium`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getWorkoutById(id: string) {
  try {
    const url = `${config.URL}json/data_workouts.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getWorkoutByUser(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_workouts.php?user=${id}&page=${page}&limit=8`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function searchWorkout(query: string, page: number) {
  try {
    const url = `${config.URL}json/data_workouts.php?query=${query}&page=${page}&limit=8`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getWorkoutsByGoal(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_workouts.php?goal=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getWorkoutsByLevel(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_workouts.php?level=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getExercisesByEquipment(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_exercises.php?equipment=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getExercisesByMuscle(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_exercises.php?muscle=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getExercisesById(id: string) {
  try {
    const url = `${config.URL}json/data_exercises.php?id=${id}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLatestDiets(page: number) {
  try {
    const url = `${config.URL}json/data_diets.php?page=${page}&limit=6`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDietsByUser(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_diets.php?user=${id}&page=${page}&limit=8`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDietsByCategory(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_diets.php?category=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getDietById(id: string) {
  try {
    const url = `${config.URL}json/data_diets.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLatestProducts(page: number) {
  try {
    const url = `${config.URL}json/data_products.php?page=${page}&limit=8`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeaturedProducts() {
  try {
    const url = `${config.URL}json/data_products.php?featured=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getProductById(id: string) {
  try {
    const url = `${config.URL}json/data_products.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getProductsByType(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_products.php?type=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getProductTypes() {
  try {
    const url = `${config.URL}json/data_types.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLatestPosts(page: number) {
  try {
    const url = `${config.URL}json/data_posts.php?page=${page}&limit=6`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getPostsByTag(id: string, page: number) {
  try {
    const url = `${config.URL}json/data_posts.php?tag=${id}&page=${page}&limit=8&order=desc`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getPostById(id: string) {
  try {
    const url = `${config.URL}json/data_posts.php?id=${id}&limit=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getWorkoutByDay(id: string, day: number) {
  try {
    const url = `${config.URL}json/data_days.php?id=${id}&day=${day}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getFeaturedPosts() {
  try {
    const url = `${config.URL}json/data_posts.php?featured=1`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getPostTags() {
  try {
    const url = `${config.URL}json/data_tags.php`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getStrings() {
  const url = `${config.URL}json/data_strings.php`;
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {}
}

export async function getGoals(page: number) {
  try {
    const url = `${config.URL}json/data_goals.php?page=${page}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getCategories(page: number) {
  try {
    const url = `${config.URL}json/data_categories.php?page=${page}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getLevels(page: number) {
  try {
    const url = `${config.URL}json/data_levels.php?page=${page}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getBodyparts(page: number) {
  try {
    const url = `${config.URL}json/data_bodyparts.php?page=${page}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export async function getEquipments(page: number) {
  try {
    const url = `${config.URL}json/data_equipments.php?page=${page}`;
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    //console.error(error);
  }
}

export const contactForm = async (
  name: string,
  email: string,
  message: string,
) => {
  const url = `${config.URL}json/contact_form.php`;

  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: name,
        user_email: email,
        user_message: message,
      }),
    });
    const json = await resp.json();
    return json;
  } catch (e) {
    // console.log('Error...', e.message);
  }
};

////////////////////////////////// Favorites

export const setWorkoutBookmark = async (item: any) => {
  try {
    await AsyncStorage.getItem('workoutsFav').then((response: any) => {
      const res = JSON.parse(response);

      if (res !== null) {
        let data = res.find((e: any) => e.id === res.id);
        if (data == null) {
          res.push(item);
          AsyncStorage.setItem('workoutsFav', JSON.stringify(res));
        }
      } else {
        let data = [];
        data.push(item);
        AsyncStorage.setItem('workoutsFav', JSON.stringify(data));
      }
    });

    return true;
  } catch (error) {
    //console.log("Error", error);
  }
};

export const removeWorkoutBookmark = async (id: any) => {
  try {
    const data = await AsyncStorage.getItem('workoutsFav').then(
      (token: any) => {
        const res = JSON.parse(token);
        return res.filter((e: any) => e.id !== id);
      },
    );

    await AsyncStorage.setItem('workoutsFav', JSON.stringify(data));
    return true;
  } catch (error) {
    //console.log("Error", error);
  }
};

export const getFavWorkouts = async () => {
  try {
    let items: any = await AsyncStorage.getItem('workoutsFav');
    let data = JSON.parse(items);
    return data;
  } catch (error) {
    //console.log("Error", error);
  }
};

export const setDietBookmark = async (item: any) => {
  try {
    await AsyncStorage.getItem('dietsFav').then((response: any) => {
      const res = JSON.parse(response);

      if (res !== null) {
        let data = res.find((e: any) => e.id === res.id);
        if (data == null) {
          res.push(item);
          AsyncStorage.setItem('dietsFav', JSON.stringify(res));
        }
      } else {
        let data = [];
        data.push(item);
        AsyncStorage.setItem('dietsFav', JSON.stringify(data));
      }
    });

    return true;
  } catch (error) {
    //console.log("Error", error);
  }
};

export const removeDietBookmark = async (id: string) => {
  try {
    const data = await AsyncStorage.getItem('dietsFav').then((token: any) => {
      const res: any = JSON.parse(token);
      return res.filter((e: any) => e.id !== id);
    });

    await AsyncStorage.setItem('dietsFav', JSON.stringify(data));
    return true;
  } catch (error) {
    //console.log("Error", error);
  }
};

export const getFavDiets = async () => {
  try {
    let items: any = await AsyncStorage.getItem('dietsFav');
    let data = JSON.parse(items);
    return data;
  } catch (error) {
    //console.log("Error", error);
  }
};
