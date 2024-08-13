import { useContext } from "react";
import { AuthContext } from "../../Component/AuthProvider/AuthProvider";
import {
  Button,
  Dialog,
  Flex,
  TextField,
} from "@radix-ui/themes/dist/cjs/index.js";
import { Text } from "@radix-ui/themes/dist/cjs/components/callout.js";
import { Label } from "@radix-ui/themes/dist/cjs/components/context-menu.js";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const handleUpdate = (name, photoURL) => {
    updateUser(name, photoURL).then(() => {
      console.log("result of the user updated value!");
    });
  };

  return (
    <div className="p-28">
      <div className="w-full md:w-[500px] md:h-[450px] sm:max-w-sm md:max-w-screen-xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col py-10 justify-center my-10 items-center pb-10 font-uiFont">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={user?.photoURL}
            alt={user?.displayName}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {user?.displayName}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {user?.email}
          </span>

          {/* Dialog */}
          <div className="flex mt-4 md:mt-6">
            <Dialog.Root>
              <div className="flex space-x-4">
                <Dialog.Trigger>
                  <Button>Edit profile</Button>
                </Dialog.Trigger>

                <Link to="/payment-page">
                  <Dialog.Trigger>
                    <Button>Payment Details</Button>
                  </Dialog.Trigger>
                </Link>
              </div>

              <Dialog.Content maxWidth="450px">
                <Dialog.Title>Edit profile</Dialog.Title>
                <Dialog.Description size="2" mb="4">
                  Make changes to your profile.
                </Dialog.Description>

                <Flex direction="column" gap="3">
                  <Label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Name
                    </Text>
                    <TextField.Root
                      name="name"
                      className="w-full ml-2"
                      defaultValue={user?.displayName}
                      placeholder="Enter your full name"
                    />
                  </Label>
                  <Label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Email
                    </Text>
                    <TextField.Root
                      disabled
                      className="w-full ml-2"
                      defaultValue={user?.email}
                      name="email"
                      placeholder="Email do not Update!"
                    />
                  </Label>
                  <Label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Image
                    </Text>
                    <input
                      type="url"
                      name="photoURL"
                      size="2"
                      className="w-full ml-2 rounded-md border-gray-300 h-8"
                    />
                  </Label>
                </Flex>

                <Flex gap="3" mt="4" justify="end">
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                  <Dialog.Close>
                    <Button
                      onClick={() =>
                        handleUpdate(user?.displayName, user?.photoURL)
                      }
                    >
                      Save
                    </Button>
                  </Dialog.Close>
                </Flex>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
