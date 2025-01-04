import { Box, Grid2, Typography } from "@mui/material";
import CustomTextField from "../../components/Form/CustomTextField";
import { Controller, useForm } from "react-hook-form";
import { IApiResponse, IUser } from "../../types/types";
import { initUser } from "../../types/initTypes";
import CustomButton, { TypeButton } from "../../components/Form/CustomButton";
import { Link, useNavigate, useParams } from "react-router-dom";
// import {
//   useAddUserMutation,
//   useGetUserQuery,
//   useUpdateUserMutation,
// } from "../../store/service/user.service";
import { useEffect, useState } from "react";
import { LoadingData } from "../../components/Loading/LoadingData";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { toast } from "react-toastify";
import {
  addUser,
  getUserByUserName,
  updateUser,
} from "../../store/axios/user.axios";

const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { username } = useParams<{ username: string }>();
  const [isLoading, setLoading] = useState<boolean>(false);
  // const { data, isLoading, error } = useGetUserQuery(username || "");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Omit<IUser, "id">>({
    // defaultValues: data ? data : initUser,
  });

  // useEffect(() => {
  //   if (data) {
  //     reset(data);
  //   }
  // }, [data, reset]);

  useEffect(() => {
    setLoading(true);
    if (username) {
      dispatch(getUserByUserName(username))
        .unwrap()
        .then((data) => {
          reset(data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          if (err?.code === 1) {
            navigate(`/error/404`);
          } else if (err?.code) {
            navigate(`/error/${err?.code}`);
          } else {
            navigate(`/error/500`);
          }
        });
    }
  }, [username, dispatch, reset]);

  // const [addUser, addResult] = useAddUserMutation();
  // const [updateUser, updateResult] = useUpdateUserMutation();
  // console.log(updateResult.error)

  const onSubmit = async (data: Omit<IUser, "id">) => {
    if (username) {
      try {
        await dispatch(updateUser(data)).unwrap();
        toast.success("Cập nhật user thành công");
      } catch (error: any) {
        navigate(`/error/${error?.code}`);
      }
    } else {
      try {
        await dispatch(addUser(data)).unwrap();
        toast.success("Thêm mới user thành công");
      } catch (error: any) {
        navigate(`/error/${error?.code}`);
      }
    }
  };

  // if (isLoading) {
  //   return <LoadingData />;
  // }

  // if (addResult.error) {
  //   if (isFetchBaseQueryError(addResult.error)) {
  //     if (addResult.error.status === 403) {
  //       navigate(`/errro/404`);
  //     }
  //     navigate(`/error/${addResult.error.status}`);
  //   } else if (isErrorWithMessage(error)) {
  //   } else {
  //     navigate("/error/500");
  //   }
  // }

  // if (updateResult.error) {
  //   if (isFetchBaseQueryError(updateResult.error)) {
  //     if (updateResult.error.status === 403) {
  //       navigate(`/errro/404`);
  //     }
  //     navigate(`/error/${updateResult.error.status}`);
  //   } else if (isErrorWithMessage(error)) {
  //   }
  // }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #1c1c1c, #666)",
        height: {
          lg: "100vh",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!isLoading ? (
        <Box
          sx={{
            bgcolor: "#d1d1d1",
            my: {
              xs: 2,
              sm: 6,
              md: 8,
              lg: 10,
            },
            mx: {
              xs: 5,
              sm: 15,
              md: 25,
              lg: 40,
            },
            px: {
              xs: 2,
              sm: 4,
              md: 6,
              lg: 10,
            },
            py: 5,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h5" fontWeight={600} textAlign={"center"}>
            {username ? "Cập nhật thông tin người dùng" : "Tạo tài khoản"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid2 container spacing={2}>
              <Grid2
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Controller
                  name="firstName"
                  control={control}
                  rules={{
                    required: "Tên không được để trống",
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Tên"
                      errorMessage={errors.firstName?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Controller
                  name="lastName"
                  control={control}
                  rules={{
                    required: "Họ/ đệm không được để trống",
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Họ/ đệm"
                      errorMessage={errors.lastName?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={12}>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Tên đăng nhập không được để trống",
                    minLength: {
                      value: 6,
                      message: "Tên đăng nhập phải có ít nhất 6 kí tự",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Tên đăng nhập"
                      errorMessage={errors.username?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={12}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email không được để trống",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Không đúng định dạng email. Vui lòng nhập lại",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Email"
                      errorMessage={errors.email?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                      type="email"
                    />
                  )}
                />
              </Grid2>
              <Grid2 size={12}>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Mật khẩu không được để trống",
                    minLength: {
                      value: 8,
                      message: "Mật khẩu phải có ít nhất 6 kí tự",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                      message:
                        "Không đúng định dạng mật khẩu. Vui lòng kiểm tra lại",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Mật khẩu"
                      errorMessage={errors.password?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                      type="password"
                    />
                  )}
                />
              </Grid2>
              <Grid2
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Số điện thoại không được để trống",
                    pattern: {
                      value: /^(0[2|3|5|7|8|9])[0-9]{9,14}$/,
                      message: "Số điện thoại không đúng định dạng",
                    },
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Số điện thoại"
                      errorMessage={errors.phone?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
              <Grid2
                size={{
                  md: 6,
                  xs: 12,
                }}
              >
                <Controller
                  name="userStatus"
                  control={control}
                  rules={{
                    required: "Trạng thái không được để trống",
                  }}
                  render={({ field }) => (
                    <CustomTextField
                      {...field}
                      title="Trạng thái"
                      errorMessage={errors.userStatus?.message}
                      inputRef={field.ref}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused": {
                            backgroundColor: "#f9f9f9",
                          },
                        },
                      }}
                    />
                  )}
                />
              </Grid2>
            </Grid2>
            {!username ? (
              <>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <CustomButton
                    name="Tạo người dùng"
                    type={TypeButton.SUBMIT}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                  <span>Bạn đã có tài khoản</span>&nbsp;&nbsp;
                  <Link to="/login" style={{ color: "blue" }}>
                    Đăng nhập
                  </Link>
                </Box>
              </>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <CustomButton name="Cập nhật" type={TypeButton.SUBMIT} />
              </Box>
            )}
          </form>
        </Box>
      ) : (
        <LoadingData />
      )}
    </Box>
  );
};

export default CreateUser;
